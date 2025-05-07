//serveris kinda

const express = require('express');
const app     = express();
const http    = require('http').createServer(app);
const io      = require('socket.io')(http);
const path    = require('path');

const istabas        = {};
const deletionTimers = {};

app.use(express.static('public'));

// ta pati lapa visiem /spele/istabaID
app.get('/spele/:istabaID', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'spele.html'));
});

io.on('connection', (socket) => {
  console.log(`Savienojās: ${socket.id}`);

  // Istabas izveide
  socket.on('izveidot-istabu', ({ nosaukums }) => {
    const id = Math.random().toString(36).substring(2, 7);
    istabas[id] = { nosaukums, izveidotajs: socket.id, soketi: [socket.id] };
    socket.join(id);
    if (deletionTimers[id]) {
      clearTimeout(deletionTimers[id]);
      delete deletionTimers[id];
    }
    socket.emit('istaba-izveidota', {
      id,
      nosaukums,
      izveidotajs: socket.id,
      dalibnieki: istabas[id].soketi
    });
    io.emit('atjaunot-istabas', istabas);
    console.log(`Izveidota istaba: ${nosaukums} (${id})`);
  });

  // kads iet uz /spele/istabaID
  socket.on('spele-page-load', (id) => {
    const istaba = istabas[id];
    if (!istaba) return socket.emit('kļūda', 'Istaba neeksistē');
    socket.emit('istabas-stats', {
      id,
      nosaukums: istaba.nosaukums,
      izveidotajs: istaba.izveidotajs,
      dalibnieki: istaba.soketi
    });
  });

  // pievienojies istabai
  socket.on('pievienoties-istabai', (id) => {
    const istaba = istabas[id];
    if (!istaba) return socket.emit('kļūda', 'Istaba neeksistē');
    if (!istaba.soketi.includes(socket.id)) {
      istaba.soketi.push(socket.id);
      socket.join(id);

      const izmantotieId = Object.values(istaba.playerMap || {});
      let nextId = 1;
      while (izmantotieId.includes(nextId)) {
      nextId++;
      }

      if (nextId > 3) {
        return socket.emit('kļūda', 'Istaba ir pilna');
      }
  
      // Pievienojam playerId mapē
      if (!istaba.playerMap) istaba.playerMap = {};
        istaba.playerMap[socket.id] = nextId;
      }

    if (deletionTimers[id]) {
      clearTimeout(deletionTimers[id]);
      delete deletionTimers[id];
      console.log(`Dzēšanas taimeris istabai ${id} atcelts — kāds pievienojās`);
    }
    io.to(id).emit('jauns-dalibnieks', { dalibnieki: istaba.soketi });
    socket.emit('pievienots', {
      id,
      nosaukums: istaba.nosaukums
      
    });

    socket.emit('player-id', {
      playerId: istaba.playerMap[socket.id]
    });

  });

    // čatiņš testam
    socket.on('chat-msg', ({ istabaID, ziņojums }) => {
      // bļauj pa istabu
      io.to(istabaID).emit('chat-msg', {
        from: socket.id,
        ziņojums,
        laiks: Date.now()
      });
    });
  

  // Istabu saraksta pieprasīšana
  socket.on('dabut-istabas', () => {
    socket.emit('atjaunot-istabas', istabas);
  });

  // Atvienošanās
  socket.on('disconnect', () => {
    for (const id in istabas) {
      const istaba = istabas[id];
      istaba.soketi = istaba.soketi.filter(s => s !== socket.id);

      if (istaba.soketi.length === 0 && !deletionTimers[id]) {
        console.log(`Istaba ${id} kļuvusi tukša — dzēsīšu pēc 10s, ja neatjaunojas`);
        deletionTimers[id] = setTimeout(() => {
          delete istabas[id];
          delete deletionTimers[id];
          console.log(`Istaba ${id} izdzēsta pēc 10s tukšuma`);
          io.emit('atjaunot-istabas', istabas);
        }, 10000);
      }
    }
  });




  const backend = require('./public/backend');

  socket.on('spelesSakums', ({ istabaID })=>{
    const istaba = istabas[istabaID];

    if (!istaba) {
      console.log(`Istaba ar ID ${istabaID} netika atrasta`);
      return;
    }

    if (istaba.soketi.length === 3) {
      console.log("aaa")
      const kartes = backend.Karsudalisana();  // Izsaucam backend funkciju
      console.log("aaassssssss")
      
      console.log(kartes)
      let dalitajsRefresh = 1
      // Nosūtām katram spēlētājam viņu kartes
      io.to(istaba.soketi[0]).emit('kartes-dati', {
        kartes: kartes.playerG1,
        dalitajsRefresh: dalitajsRefresh
      });
      
      io.to(istaba.soketi[1]).emit('kartes-dati', {
        kartes: kartes.playerG2,
        dalitajsRefresh: dalitajsRefresh
      });
      
      io.to(istaba.soketi[2]).emit('kartes-dati', {
        kartes: kartes.playerG3,
        dalitajsRefresh: dalitajsRefresh
      });
      
    }
  })


  socket.on('updateX', ({ istabaID, jaunais, kartsVertiba,mansPlayerId }) => {//maina dalitaju placedCards
    console.log("sagaja")
    console.log(jaunais)
    console.log(kartsVertiba)
    if(jaunais == 4){
      jaunais = 1
    }
    io.to(istabaID).emit('updatedGajiens', {jaunais, kartsVertiba,mansPlayerId});  // Emit updated value to all clients in the room
  });


  socket.on('gajienaUzvaretajs', ({ istabaID, GajUzvaretajs }) => {
    console.log("Winner received:", GajUzvaretajs);
    io.to(istabaID).emit('updatedUzvaretajs', GajUzvaretajs); // Emit to the room using istabaID
  });
  


}); 

http.listen(3000, () => {
  console.log('Serveris darbojas: http://localhost:3000');
});
