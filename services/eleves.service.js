let Eleves = require('../model/eleves');
const ElevesService = {
    create: (nom,prenom) => {
            return Eleves.create({
                nom,
                prenom,
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
};
module.exports = ElevesService;
