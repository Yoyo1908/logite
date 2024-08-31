document.addEventListener('DOMContentLoaded', function() {
    const gridContainer = document.getElementById('grid-container');
    const clearButton = document.getElementById('clearButton');
    const undoButton = document.getElementById('undoButton');
    const andGateButton = document.getElementById('andGate');
    const orGateButton = document.getElementById('orGate');
    const notGateButton = document.getElementById('notGate');

    // Initialize history array to keep track of grid states
    let history = [];
    let selectedGate = null;

    // Function to save the current state of the grid to history
    function saveState() {
        const cells = Array.from(document.querySelectorAll('.grid-cell'));
        const state = cells.map(cell => ({
            active: cell.classList.contains('active'),
            backgroundImage: cell.style.backgroundImage
        }));
        history.push(state);
    }

    // Create a 20x20 grid
    for (let i = 0; i < 150; i++) { // 20x20 = 400
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');

        // Add click event to each cell
        cell.addEventListener('click', function() {
            if (selectedGate) {
                saveState(); // Save the state before changing
                cell.classList.add('active');
                cell.style.backgroundImage = `url('${selectedGate}')`;
            } else {
                cell.classList.toggle('active');
                // Optional: Clear background image when toggling active state
                if (!cell.classList.contains('active')) {
                    cell.style.backgroundImage = '';
                }
            }
        });

        gridContainer.appendChild(cell);
    }

    // Add click event to the clear button to reset grid
    clearButton.addEventListener('click', function() {
        saveState(); // Save the state before clearing
        const cells = document.querySelectorAll('.grid-cell');
        cells.forEach(cell => {
            cell.classList.remove('active');
            cell.style.backgroundImage = '';
        });
    });

    // Add click event to the undo button to revert to the previous state
    undoButton.addEventListener('click', function() {
        if (history.length > 0) {
            const lastState = history.pop();
            const cells = document.querySelectorAll('.grid-cell');
            cells.forEach((cell, index) => {
                const state = lastState[index];
                if (state) {
                    cell.classList.toggle('active', state.active);
                    cell.style.backgroundImage = state.backgroundImage;
                }
            });
        }
    });

    // Add click events to gate buttons to set the selected gate
    andGateButton.addEventListener('click', function() {
        selectedGate = 'and.jpeg'; // Path to AND gate image
    });

    orGateButton.addEventListener('click', function() {
        selectedGate = images/or.jpeg; // Path to OR gate image
    });

    notGateButton.addEventListener('click', function() {
        selectedGate = images/not.jpeg; // Path to NOT gate image
    });
});