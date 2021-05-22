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

function toggleColor(element, type) {
    var color = element.css("backgroundColor");
    if (color == 'rgba(0, 0, 0, 0)') {
        element.css("backgroundColor", getColor(type));
    } else {
        element.css("backgroundColor", 'rgba(0, 0, 0, 0)');
    }
}

function func(){

    const db = new Dexie("Codenames");
    db.version(1).stores({
      codes: 'id,name,type'
    });

    db.codes.toArray(function (codes) {
        for (let i = 0; i < codes.length; i++) {
            var code = $(".row:nth(" + Math.floor(i / 5) + ") > div:nth(" + i  % 5 + ")");
            code.text(codes[i].name);
            $(document).ready(function(){
                code.click(function(){
                    toggleColor($(this), codes[i].type);
                })
            });
        }
    });        
}
window.onload = func