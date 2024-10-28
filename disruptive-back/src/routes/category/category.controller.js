const category = require("../../models/category");

module.exports = {
    
    async createCategory(req, res) {
        
        const { type } = req.body;
        const ctgory = new category({
            type
        });

        req.category = ctgory;

        //console.log(ctgory.type)
        
        const categExist = await category.findOne({type: ctgory.type});
        if(categExist){
            res.status(409).json({ message: 'Esta categoría ya existe'})
        }

        try {
            await ctgory.validate();
            if(ctgory.isNew) {
                await ctgory.save();
                res.json({ message: 'Categoría creada con éxito' });
            }  else {
                res.status(400).json({ message: 'Error al crear la categoría' });
            }
        } catch (error) {
            if(error.name === 'ValidationError') {
                res.status(400).json({ message: 'Error al crear la categoría', errors: error.errors });
            } else {
                return res.status(500).json({ message: 'Error internal server' });
            }
        }
    },

    async getCategories(req, res) {
        try {
            const categories = await category.find({ deletedAt: null });
            res.send(categories);
        } catch (error) {
            res.status(400).send({ message: `Error obteniendo las categorías` });
        }
    },

    async getCategoryById(req, res) {
        try{
            const ctgory = await category.findById(req.params.id);
            if(!ctgory || ctgory.deletedAt !== null) {
                res.status(404).send({ message: `La categoría con id ${req.params.id} no existe o ha sido eliminada` });
            } else {
                res.send({ ...ctgory._doc});
            }
        }catch (error) {
            console.log(error.message);
            res.status(400).send({ message: `Error obteniendo la temática ${req.params.id}.` });
        }
    },

    // TODO: traer las categorias eliminadas solo admin

    async getCategoriesDeleted(req, res) {
        try {
            const categories = await category.find({ deletedAt: { $ne: null} });
            res.send(categories);
        } catch (error) {
            res.status(400).send({ message: `Error obteniendo las categorías` });
        }
    },

    async getCategoryByIdDeleted(req, res) {
        try {
            const ctgory = await category.findById(req.params.id);
            if(!ctgory) {
                res.status(404).send({ message: `La categoría con id ${req.params.id} no existe` });
            } else if (ctgory.deletedAt !== null){
                res.send({ ...ctgory._doc});
            }
        } catch (error) {
            console.log(error.message);
            res.status(400).send({ message: `Error obteniendo la temática ${req.params.id}.` });
        }
    },

    async deleteCategory(req, res) {
        try{
            const ctgory = await category.findById(req.params.id);
            if(!ctgory) {
                res.status(404).send({ message: `La categoría con id ${req.params.id} no existe` });
            } else {
                ctgory.deletedAt = new Date();
                await ctgory.save();
                //await category.findByIdAndDelete(req.params.id);
                res.status(200).send({ message: "La categoría se ha eliminado" })
            }
        }catch (error) {
            res.status(400).send({ message: "Error al eliminar la categoría" });
        }
    }

    

}