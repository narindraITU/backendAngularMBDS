let Eleves = require('../model/eleves');
const ElevesService = {
    create: (nom,prenom) => {
            return Eleves.create({
                nom,
                prenom,
                dateCreated: new Date(),
            });
    },
    delete: (id) => {
            return Eleves.findByIdAndRemove(id);
    },
    update: (nom,prenom,id) => {
        return Eleves.findByIdAndUpdate(id, {
            nom,
            prenom
        });
    },
    load: (page) => {
        var aggregateQuery = Eleves.aggregate();
        return Eleves.aggregatePaginate(
            aggregateQuery,
            {
                page: parseInt(page) || 1,
                limit: 10,
            }
        );
    },
    loadAll: function(){
        return Eleves.find({});
    },
    findById(id){
        return Eleves.findById(id);
    }
};
module.exports = ElevesService;
