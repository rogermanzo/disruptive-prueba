const thematic = require('../../models/thematic');

module.exports = {
    
    async createThematic(req, res) {
        
        const {name, permission} = req.body;

        const themic = new thematic({
            name,
            permission: JSON.parse(`["${permission}"]`)
        });

        //console.log(req.body);

        req.thematic = themic;

        //console.log(themic);

        try {
            if(!themic.name == "" || themic.permission.length == 0
            ){
                await themic.save();
                res.json({ message: 'Temática creada con éxito' });
            } else {
                res.status(400).json({ message: 'Error al crear la temática' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error internal server' });
        }
    },

    async getThematics(req, res) {
      try {
          const thematics = await thematic.find();
          res.send(thematics);
      } catch (error) {
          res.status(400).send({ message: `Error obteniendo las temáticas` });
      }
    },

    async getThematicById(req, res) {
      try {
          const themic = await thematic.findById(req.params.id);
          //console.log(themic);
          if (!themic) {
              res.status(404).send({ message: `La temática con id ${req.params.id} no existe` });
          } else {
              const permissionArray = themic.permission[0].split(',').map(permission => permission.trim());
              res.send({ ...themic._doc, permission: permissionArray });
          }
      } catch (error) {
          console.log(error.message);
          res.status(400).send({ message: `Error obteniendo la temática ${req.params.id}.` });
      }
    },

    async updateThematic(req, res) {
      try {
          const themic = await thematic.findById(req.params.id);

          if(!themic) {
            res.status(404).send({ message: `La temática con id ${req.params.id} no existe` });
          } else {
            const { name, permission } = req.body;
            await thematic.findByIdAndUpdate(req.params.id, {name: name, permission: JSON.parse(`["${permission}"]`)});
            res.status(201).send({message: "La temática se ha actualizado"});
          }
      } catch (error) {
          res.status(400).send({ message: 'Error al actualizar la temática' });
      }
    },

    async deleteThematic(req, res) {
      
      try{
      const themic = await thematic.findById(req.params.id);

      if(!themic) {
        res.status(404).send({ message: `La temática con id ${req.params.id} no existe` });
      } else {
        await thematic.findByIdAndDelete(req.params.id);
        res.status(200).send({message: "La temática se ha eliminado"});
      }
    }catch (error) {
      res.status(400).send({ message: 'Error al eliminar la temática' });
    }
  }
};