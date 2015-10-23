var initialData = [
    { fullName: "Sam Alvey", salary: 8400, fight: 4 },
    { fullName: "Timothy Johnson", salary: 8700, fight: 6 },
    { fullName: "Beneil Dariush", salary: 9200, fight: 10 },
    { fullName: "Sirwan Kakai", salary: 9300, fight: 11 },
    { fullName: "Glover Teixeira", salary: 9900, fight: 13 },
    { fullName: "Marlon Vera", salary: 10000, fight: 12 },
    { fullName: "Frankie Saenz", salary: 10100, fight: 11 },
    { fullName: "Michael Johnson", salary: 10200, fight: 10 },
    { fullName: "Jonathan Wilson", salary: 10400, fight: 8 },
    { fullName: "Jared Rosholt", salary: 10700, fight: 6 },
    { fullName: "Uriah Hall", salary: 10900, fight: 5 },
    { fullName: "Derek Brunson", salary: 11000, fight: 4 },
    { fullName: "Dustin Ortiz", salary: 11200, fight: 3 },
    { fullName: "Ray Borg", salary: 11300, fight: 2 },
    { fullName: "Scott Holtzman", salary: 11400, fight: 1 },
    { fullName: "Los Angeles Gates", salary: 8200, fight: 3 },
    { fullName: "Bronx Bamgbose", salary: 8500, fight: 5 }
];
 
var FightersModel = function(fighters) {
    var self = this;
    self.fighters = ko.observableArray(ko.utils.arrayMap(fighters, function(fighter) {
        return { fullName: fighter.fullName, salary: fighter.salary, fight: fighter.fight };
    }));
 
    self.addFighter = function() {
        self.fighters.push({
            fullName: "",
            salary: 0,
            fight: 0
        });
    };
 
    self.removeFighter = function(fighter) {
        self.fighters.remove(fighter);
    };
 
    self.save = function() {
        self.lastSavedJson(JSON.stringify(ko.toJS(self.fighters), null, 2));
    };

    self.getCombinations = function(){
        var fighters = self.fighters();
        // 50000 slaray cap DONE
        var salary = 50000;
        var curSalary = 0;

        // 5 fighters per combination DONE
        // No fighters with the same fight number DONE
        // Remove duplicates DONE
        var temp= [];
        var curFighters = [];
        var curFightNum = [];
        var sameFight = false;
        var isDuplicate = false;

        var numFighters = Math.pow(2, fighters.length);

        for (i=0; i < numFighters ; i++) {
            temp= [];
            curFightNum = [];
            curSalary = 0;
            sameFight = false;
            isDuplicate = false;

            $.each(fighters, function(index, value){
                if (i & Math.pow(2,index) && curSalary + fighters[index].salary <= 50000){
                    // check fight numbers of fighters, don't add if they have the same fight number
                    if(curFightNum.length > 0) {
                        for(k=0; k<curFightNum.length; k++) {
                            if(fighters[index].fight == curFightNum[k]){
                                sameFight = true;
                            }
                        }
                    }

                    if(!sameFight){
                        temp.push(fighters[index]); //.fullName
                        curSalary += fighters[index].salary;
                        curFightNum.push(fighters[index].fight);
                    }
                }
            });

            if (temp !== "" && temp.length == 5) {
                $.each(curFighters, function(index, value){
                    if($(curFighters[index]).not(temp).length === 0 && $(temp).not(curFighters[index]).length === 0){
                        isDuplicate = true;
                        return;
                    }
                });

                if(!isDuplicate){
                    curFighters.push(temp);
                }
            }
        }

        self.lastSavedJson(JSON.stringify(ko.toJS(curFighters), null, 2));
        console.log(curFighters.join("\n"));
    };
 
    self.lastSavedJson = ko.observable("")
};
 
ko.applyBindings(new FightersModel(initialData));