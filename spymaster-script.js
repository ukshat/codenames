function shuffle(array) {
  
    "use strict";
    
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function getColor(type) {
    switch (type) {
        case "red": 
            return "tomato";
        case "blue":
            return "deepSkyBlue";
        case "neutral":
            return "silver";
        case "death":
            return "gray";
    }
}

function main () {
    
    "use strict";
    
    var dictionary = ['Africa', 'agent', 'air', 'alien', 'alps', 'amazon', 'ambulance', 'America', 'angel', 'Antarctica', 'apple', 'arm', 'Atlantis', 'Australia', 'Aztec', 'back', 'ball', 'band', 'bank', 'bar', 'bark', 'bat', 'battery', 'beach', 'bear', 'beat', 'bed', 'Beijing', 'bell', 'belt', 'Berlin', 'Bermuda', 'berry', 'bill', 'block', 'board', 'bolt', 'bomb', 'bond', 'boom', 'boot', 'bottle', 'bow', 'box', 'bridge', 'brush', 'buck', 'buffalo', 'bug', 'bugle', 'button', 'calf', 'canada', 'cap', 'capital', 'car', 'card', 'carrot', 'casino', 'cast', 'cat', 'cell', 'centaur', 'center', 'chair', 'change', 'charge', 'check', 'chest', 'chick', 'China', 'chocolate', 'church', 'circle', 'cliff', 'cloak', 'club', 'code', 'cold', 'comic', 'compound', 'concert', 'conductor', 'contract', 'cook', 'copper', 'cotton', 'court', 'cover', 'crane', 'crash', 'cricket', 'cross', 'crown', 'cycle', 'Czech', 'dance', 'date', 'day', 'death', 'deck', 'degree', 'diamond', 'dice', 'dinosaur', 'disease', 'doctor', 'dog', 'draft', 'dragon', 'dress', 'drill', 'drop', 'duck', 'dwarf', 'eagle', 'Egypt', 'embassy', 'engine', 'England', 'Europe', 'eye', 'face', 'fair', 'fall', 'fan', 'fence', 'field', 'fighter', 'figure', 'file', 'film', 'fire', 'fish', 'flute', 'fly', 'foot', 'force', 'forest', 'fork', 'France', 'game', 'gas', 'genius', 'Germany', 'ghost', 'giant', 'glass', 'glove', 'gold', 'grace', 'grass', 'Greece', 'green', 'ground', 'ham', 'hand', 'hawk', 'head', 'heart', 'helicopter', 'Himalayas', 'hole', 'Hollywood', 'honey', 'hood', 'hook', 'horn', 'horse', 'horseshoe', 'hospital', 'hotel', 'ice', 'ice cream', 'India', 'iron', 'ivory', 'jack', 'jam', 'jet', 'Jupiter', 'kangaroo', 'ketchup', 'key', 'kid', 'king', 'kiwi', 'knife', 'knight', 'lab', 'lap', 'laser', 'lawyer', 'lead', 'lemon', 'leprechaun', 'life', 'light', 'limousine', 'line', 'link', 'lion', 'litter', 'Loch Ness', 'lock', 'log', 'London', 'luck', 'mail', 'mammoth', 'maple', 'marble', 'march', 'mass', 'match', 'mercury', 'Mexico', 'microscope', 'millionaire', 'mine', 'mint', 'missile', 'model', 'mole', 'moon', 'Moscow', 'mount', 'mouse', 'mouth', 'mug', 'nail', 'needle', 'net', 'New York', 'night', 'ninja', 'note', 'novel', 'nurse', 'nut', 'octopus', 'oil', 'olive', 'Olympus', 'opera', 'orange', 'organ', 'palm', 'pan', 'pants', 'paper', 'parachute', 'park', 'part', 'pass', 'paste', 'penguin', 'phoenix', 'piano', 'pie', 'pilot', 'pin', 'pipe', 'pirate', 'pistol', 'pit', 'pitch', 'plane', 'plastic', 'plate', 'platypus', 'play', 'plot', 'point', 'poison', 'pole', 'police', 'pool', 'port', 'post', 'pound', 'press', 'princess', 'pumpkin', 'pupil', 'pyramid', 'queen', 'rabbit', 'racket', 'ray', 'revolution', 'ring', 'robin', 'robot', 'rock', 'Rome', 'root', 'rose', 'roulette', 'round', 'row', 'ruler', 'satellite', 'Saturn', 'scale', 'school', 'scientist', 'scorpion', 'screen', 'scuba diver', 'seal', 'server', 'shadow', 'Shakespeare', 'shark', 'ship', 'shoe', 'shop', 'shot', 'sink', 'skyscraper', 'slip', 'slug', 'smuggler', 'snow', 'snowman', 'sock', 'soldier', 'soul', 'sound', 'space', 'spell', 'spider', 'spike', 'spine', 'spot', 'spring', 'spy', 'square', 'stadium', 'staff', 'star', 'state', 'stick', 'stock', 'straw', 'stream', 'strike', 'string', 'sub', 'suit', 'superhero', 'swing', 'switch', 'table', 'tablet', 'tag', 'tail', 'tap', 'teacher', 'telescope', 'temple', 'theater', 'thief', 'thumb', 'tick', 'tie', 'time', 'Tokyo', 'tooth', 'torch', 'tower', 'track', 'train', 'triangle', 'trip', 'trunk', 'tube', 'turkey', 'undertaker', 'unicorn', 'vacuum', 'van', 'vet', 'wake', 'wall', 'war', 'washer', 'Washington', 'watch', 'water', 'wave', 'web', 'well', 'whale', 'whip', 'wind', 'witch', 'worm', 'yard'];
    
    var codenames = new Array(25);
    
    dictionary = shuffle(dictionary);
    var words = dictionary.slice(0, 25);
    var notUsedWords = dictionary.slice(25);
    
    const db = new Dexie("Codenames");
    db.version(1).stores({
      codes: 'id,name,type'
    });
    
    var numReds = 8 + Math.round(Math.random());
    var numBlues = 17 - numReds;
    var numNeutral = 7;
    
    var redWords = words.splice(0, numReds);
    var blueWords = words.splice(0, numBlues);
    var neutralWords = words.splice(0, numNeutral);
    var deathWords = words.splice(0, 1);
    
    var coloredWords = new Array(25);
    for (let i = 0; i < numReds; i++) {
        coloredWords[i] = {name: redWords[i], type: "red"};
    }
    for (let i = numReds; i < numReds + numBlues; i++) {
        coloredWords[i] = {name: blueWords[i - numReds], type: "blue"};
    }
    for (let i = numReds + numBlues; i < numReds + numBlues + numNeutral; i++) {
        coloredWords[i] = {name: neutralWords[i - numReds - numBlues], type: "neutral"};
    }
    
    coloredWords[24] = {name: deathWords[0], type: "death"};
    
    coloredWords = shuffle(coloredWords);

    const wordObjects = new Array(25);
    for (let i = 0; i < 25; i++) {
        wordObjects[i] = {id: i, name: coloredWords[i].name, type: coloredWords[i].type};        
    }
    
    db.codes.clear().then(function() {
        db.codes.bulkAdd(wordObjects).then(function() {
            db.codes.toArray(function (codes) {
                for (let i = 0; i < codes.length; i++) {
                    var code = $(".row:nth(" + Math.floor(i / 5) + ") > div:nth(" + i  % 5 + ")");
                    code.text(codes[i].name);
                    code.css("backgroundColor", getColor(codes[i].type));
                    $(document).ready(function(){
                        code.click(function(){
                            wordObjects[i].name = notUsedWords.shift();
                            var location = $(this);
                            db.codes.put({id: i, name: wordObjects[i].name, type: wordObjects[i].type}).then(function() {
                                location.text(wordObjects[i].name);
                            })
                        })
                    });
                }
            });        
        }).catch(Dexie.BulkError, function (e) {
            // Explicitly catching the bulkAdd() operation makes those successful
            // additions commit despite that there were errors.
            console.error ("Some words did not succeed. However, " +
               100000 - e.failures.length + " words was added successfully");
        });
    });
        
};

window.onload = main;

