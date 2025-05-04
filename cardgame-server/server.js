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

}); 

http.listen(3000, () => {
  console.log('Serveris darbojas: http://localhost:3000');
});
