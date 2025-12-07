const flashcards = {
    hash: [
        {
            term: "Hash Code",
            definition: "A numeric value generated from an object that determines its position in a hash table. Must be consistent and distribute values uniformly."
        },
        {
            term: "Collisions",
            definition: "Occurs when two different keys generate the same hash code or map to the same index. Resolved using chaining or probing techniques."
        },
        {
            term: "Linear Probing",
            definition: "Collision resolution by searching sequentially (index+1, index+2...) until finding an empty slot. Can cause primary clustering."
        },
        {
            term: "Quadratic Probing",
            definition: "Collision resolution using quadratic function (index+1², index+2², index+3²). Reduces clustering better than linear probing."
        },
        {
            term: "Chaining",
            definition: "Collision resolution where each array index stores a linked list of all elements that hash to that location."
        },
        {
            term: "Performance",
            definition: "Hash table operations average O(1) with good hash function and load factor < 0.75. Poor conditions degrade to O(n)."
        }
    ],
    sets: [
        {
            term: "Set",
            definition: "Abstract data type storing unique elements with no duplicates. Supports add, remove, and contains operations."
        },
        {
            term: "Map",
            definition: "Abstract data type storing key-value pairs where each key is unique. Also called dictionary or associative array."
        },
        {
            term: "Set Interface",
            definition: "Java interface defining set contract with methods like add(), remove(), contains(), size(). Implemented by HashSet and TreeSet."
        },
        {
            term: "Map Interface",
            definition: "Java interface defining map contract with methods like put(), get(), remove(), containsKey(). Implemented by HashMap and TreeMap."
        },
        {
            term: "Key-Value Pairs",
            definition: "Fundamental unit in maps where each unique key is associated with exactly one value. Keys must be unique, values can repeat."
        }
    ],
    sorting: [
        {
            term: "Bubble Sort",
            definition: "Simple O(n²) sorting algorithm that repeatedly swaps adjacent elements if they're in wrong order. Easy but inefficient."
        },
        {
            term: "Selection Sort",
            definition: "O(n²) sorting that repeatedly finds minimum from unsorted region and moves it to sorted region. Fewer swaps than bubble sort."
        },
        {
            term: "Heapsort",
            definition: "O(n log n) sorting using binary heap. Builds max-heap then repeatedly extracts maximum. Guaranteed O(n log n) but slower than quicksort in practice."
        },
        {
            term: "Quicksort",
            definition: "Efficient O(n log n) average divide-and-conquer sort. Picks pivot, partitions, recursively sorts. O(n²) worst case but most practical."
        },
        {
            term: "Insertion Sort",
            definition: "O(n²) average sorting that builds final array one item at a time. Efficient for small or nearly-sorted data. Like sorting playing cards."
        },
        {
            term: "Big-O",
            definition: "Notation describing algorithm complexity as input grows. O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)."
        },
        {
            term: "Java Sorting Methods",
            definition: "Arrays.sort() uses Dual-Pivot Quicksort for primitives. Collections.sort() uses Timsort for objects. Both O(n log n) average."
        }
    ],
    trees: [
        {
            term: "Global Balancing",
            definition: "Reorganizes entire tree structure at once to achieve perfect balance. High one-time cost but optimal result. Example: DSW algorithm."
        },
        {
            term: "Sorted Array",
            definition: "Array in order enabling O(log n) binary search. Can be intermediate step: flatten tree to array, rebuild balanced from middle."
        },
        {
            term: "DSW Algorithm",
            definition: "Day-Stout-Warren algorithm for global balancing. Creates backbone via right rotations, then balances via left rotations. O(n) time, O(1) space."
        },
        {
            term: "Local Balancing",
            definition: "Maintains balance incrementally during operations by fixing local imbalances with rotations. Only affected portion rebalanced. AVL and red-black use this."
        },
        {
            term: "AVL Trees",
            definition: "Self-balancing BST where height difference between subtrees is at most 1. Uses rotations after insert/delete. O(log n) operations, stricter than red-black."
        },
        {
            term: "Balancing AVL Trees",
            definition: "Uses single or double rotations when balance factor becomes ±2. Four cases: Left-Left, Right-Right, Left-Right, Right-Left."
        },
        {
            term: "Red-Black Trees",
            definition: "Self-balancing BST using node colors and five properties. Less strict than AVL but fewer rotations. Used in Java TreeMap and C++ std::map."
        },
        {
            term: "B-Trees and Order",
            definition: "Multi-way tree optimized for disk I/O. Each node has multiple keys (up to 2t-1) where t is order. All leaves at same level. Used in databases."
        }
    ],
    graphs: [
        {
            term: "Terminology",
            definition: "Graph has vertices (nodes) and edges (connections). Can be directed/undirected, weighted/unweighted. Path connects vertices, cycle returns to start."
        },
        {
            term: "Representation",
            definition: "Three main ways to store graphs: adjacency list (array of neighbor lists), adjacency matrix (2D array), incidence matrix (vertex-edge relationships)."
        },
        {
            term: "Adjacency List",
            definition: "Each vertex stores list of neighbors. Space-efficient for sparse graphs O(V+E). Fast neighbor iteration. Best for most real-world graphs."
        },
        {
            term: "Adjacency Matrix",
            definition: "2D array where matrix[i][j] indicates edge from i to j. O(1) edge lookup but O(V²) space. Better for dense graphs."
        },
        {
            term: "Incidence Matrix",
            definition: "Rows=vertices, columns=edges. Shows which vertices touch which edges. O(V*E) space, rarely used in practice but useful for theory."
        }
    ]
};

let currentChapter = null;
let currentCardIndex = 0;
let isFlipped = false;

function selectChapter(chapter, el) {
    currentChapter = chapter;
    currentCardIndex = 0;
    isFlipped = false;

    document.querySelectorAll('.chapter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (el) el.classList.add('active');

    showCard();
    document.getElementById('controls').style.display = 'flex';
}

function showCard() {
    const cards = flashcards[currentChapter] || [];
    if (!cards.length) {
        const container = document.getElementById('cardContainer');
        container.innerHTML = `<div class="start-screen"><h2>No cards found</h2></div>`;
        document.getElementById('controls').style.display = 'none';
        return;
    }

    const card = cards[currentCardIndex];
    const container = document.getElementById('cardContainer');
    container.innerHTML = '';

    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    cardEl.addEventListener('click', flipCard);

    const front = document.createElement('div');
    front.className = 'card-face card-front';
    front.innerHTML = `<div class="card-term">${card.term}</div><div class="card-hint">Click to reveal definition</div>`;

    const back = document.createElement('div');
    back.className = 'card-face card-back';
    back.innerHTML = `<div class="card-definition">${card.definition}</div><div class="card-hint">Click to see term</div>`;

    cardEl.appendChild(front);
    cardEl.appendChild(back);
    container.appendChild(cardEl);

    document.getElementById('progress').textContent = `${currentCardIndex + 1} / ${cards.length}`;
    document.getElementById('prevBtn').disabled = currentCardIndex === 0;
    document.getElementById('nextBtn').disabled = currentCardIndex === cards.length - 1;
    isFlipped = false;
}

function flipCard() {
    const card = document.querySelector('.card');
    if (!card) return;
    card.classList.toggle('flipped');
    isFlipped = !isFlipped;
}

function nextCard() {
    const cards = flashcards[currentChapter];
    if (currentCardIndex < cards.length - 1) {
        currentCardIndex++;
        showCard();
    }
}

function previousCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        showCard();
    }
}

document.addEventListener('keydown', (e) => {
    if (!currentChapter) return;

    if (e.key === 'ArrowLeft') {
        previousCard();
    } else if (e.key === 'ArrowRight') {
        nextCard();
    } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        flipCard();
    }
});
