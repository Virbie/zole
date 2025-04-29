function arrangeCardsInArc() {
    const cards = document.querySelectorAll(".card");
    const total = cards.length;
    const containerWidth = container.clientWidth;
    const centerX = containerWidth / 2;
    const baseY = 700;

    const radius = containerWidth * 0.3;
    const maxSpread = 80;
    const spread = total > 1 ? maxSpread * ((total - 1) / 7) : 0;
    const minAngle = -spread / 2;
    const maxAngle = spread / 2;
    const peakOffset = container.clientHeight * 0.15;

    cards.forEach((card, i) => {
        const angle = total === 1 ? 0 : minAngle + ((maxAngle - minAngle) / (total - 1)) * i;
        const radians = (angle * Math.PI) / 180;

        const x = centerX + radius * Math.sin(radians) - card.offsetWidth / 2;

        let arcOffset = 0;
        if (total > 1) {
            const midpoint = (total - 1) / 2;
            const distanceFromMid = Math.abs(i - midpoint);
            const factor = 1 - (distanceFromMid / midpoint);
            arcOffset = peakOffset * factor;
        }

        const y = baseY - radius * Math.cos(radians) - card.offsetHeight / 2 - arcOffset;

        const baseTransform = `rotate(${angle}deg) translateY(0px)`;
        card.style.left = `${x}px`;
        card.style.top = `${y}px`;
        card.style.transform = baseTransform;
        card.dataset.baseTransform = baseTransform; // Save for later
          });
       }