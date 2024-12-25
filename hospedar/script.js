function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

function createAdditionalEntry(value, isFixed = false) {
    const additionalEntriesDiv = document.getElementById('additional-entries');
    const entryDiv = document.createElement('div');
    entryDiv.className = 'additional-entry';

     let entryTime;
    if (isFixed) {
        const fixedHours = String(new Date().getHours()).padStart(2, '0');
        entryTime = `${fixedHours}:28:40`;
    } else {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        entryTime = `${hours}:${minutes}:${seconds}`;
    }

    entryDiv.innerHTML = `Entrada: ${entryTime} - R$${value.toFixed(2)}`;
    additionalEntriesDiv.appendChild(entryDiv);
}

document.addEventListener('DOMContentLoaded', function () {
    updateClock();
    setInterval(updateClock, 1000);

    const winButton = document.getElementById('win-button');
    const loseButton = document.getElementById('lose-button');
    const firstEntryElement = document.getElementById('first-entry');
    const additionalEntriesDiv = document.getElementById('additional-entries');
     const sadMessageDiv = document.getElementById('sad-message');
    const finishButton = document.getElementById('finish-button');
    const entryTimeElement = document.getElementById('entry-time');
     let loseClicked = false;
     let firstEntryUpdated = false;

  winButton.addEventListener('click', function () {
      if (!firstEntryUpdated) {
            if (additionalEntriesDiv.innerHTML === "") {
              entryTimeElement.textContent = entryTimeElement.textContent;
              for (let i = 0; i < 4; i++) {
                  createAdditionalEntry(50);
              }
            finishButton.classList.remove('hidden');
          }
        }else {
          const metaMessageDiv = document.getElementById('meta-message');
          metaMessageDiv.classList.remove('hidden');
          const metaText = document.getElementById('meta-text');
          metaText.textContent = 'Boa!';
      }

    });
   loseButton.addEventListener('click', function () {
        if (!loseClicked) {
            if (additionalEntriesDiv.innerHTML === "") {
                 const currentTime = document.getElementById('entry-time').textContent
                firstEntryElement.innerHTML = `Primeira entrada: ${currentTime} - <span class="red">200,00</span><span class="white">50,00</span>`;
                loseClicked = true;
                firstEntryUpdated = true;
             }
        } else {
             sadMessageDiv.classList.remove('hidden');
            document.querySelector('.container').innerHTML = sadMessageDiv.outerHTML;
        }

    });
      finishButton.addEventListener('click', function () {
          const victoryMessageDiv = document.getElementById('victory-message');
        victoryMessageDiv.classList.remove('hidden');
          setTimeout(() => {
            location.reload();
        }, 1500);
      });
});