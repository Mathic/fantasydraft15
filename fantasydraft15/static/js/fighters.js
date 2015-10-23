var initialData = [
    { fullName: "Paddy Holohan", salary: 9600, fight: 1 },
    { fullName: "Louis Smolka", salary: 9800, fight: 1 },
    { fullName: "Norman Parke", salary: 10800, fight: 2 },
    { fullName: "Reza Madadi", salary: 8600, fight: 2 },
    { fullName: "Darren Till", salary: 9300, fight: 3 },
    { fullName: "Nicolas Dalby", salary: 10100, fight: 3 },
    { fullName: "Jon Delos Reyes", salary: 9400, fight: 4 },
    { fullName: "Neil Seery", salary: 10000, fight: 4 },
    { fullName: "Stevie Ray", salary: 11000, fight: 5 },
    { fullName: "Mickael Lebout", salary: 8400, fight: 5 },
    { fullName: "Aisling Daly", salary: 9900, fight: 6 },
    { fullName: "Ericka Almeida", salary: 9500, fight: 6 },
    { fullName: "Krzysztof Jotko", salary: 9700, fight: 7 },
    { fullName: "Scott Askham", salary: 9700, fight: 7 },
    { fullName: "Tom Breese", salary: 10600, fight: 8 },
    { fullName: "Cathal Pendred", salary: 8800, fight: 8 },
    { fullName: "Darren Elkins", salary: 10200, fight: 9 },
    { fullName: "Rob Whiteford", salary: 9000, fight: 9 },
    { fullName: "Bubba Bush", salary: 10500, fight: 10 },
    { fullName: "Garreth McLlellen", salary: 8900, fight: 10 }
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