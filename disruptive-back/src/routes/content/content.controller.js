const auth = require("../../auth/auth");
const thematic = require("../../models/thematic");
const content = require("../../models/content");

module.exports = {
    
    async createContent(req, res) {

      const thematicFound = await thematic.findById(req.body.thematic);

      if(!thematicFound){
        res.status(400).json({ message: 'La temática que ha seleccionado al parecer no existe' });
      }

      try {
        const newContent = new content({
          category: req.body.category,
          thematic: req.body.thematic,
          //author: req.body.author,
          name: req.body.name
          //desarrollar el USERME
        });
    
        if (req.files) {
          newContent.files = req.files.map(({ filename, path }) => ({ filename, path }));
        }
        
        await newContent.save();
        res.status(201).json({ message: 'Contenido creado con éxito' });
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error al crear contenido' });
      }
    },

    async getContents(req, res) {
        try {
          const cntent = await content.find();
          res.send(cntent);
        } catch (error) {
          res.status(400).json({ message: 'Error al obtener contenido' });
        }
    },

    async getContentById(req, res) {
      try {
        const cntent = await content.findById(req.params.id);
        if (!cntent) {
          res.status(404).send({ message: `El contenido con id ${req.params.id} no existe o ha sido eliminado` });
        } else {
          res.send(cntent);
        }
      } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: `Error obteniendo el contenido ${req.params.id}.` });
      }
    },

    async updateContent(req, res) {
      try {
        //const author = await auth.returnAuthor(req, res);
        const contentId = req.params.id;
        const updateContent = await content.findById(contentId);
    
        if (!updateContent) {
          res.status(404).json({ message: 'Contenido no encontrado' });
        } else {
          updateContent.category = req.body.category;
          updateContent.thematic = req.body.thematic;
          //updateContent.author = req.body.author;
          updateContent.name = req.body.name;
          if (req.files) {
            updateContent.files = req.files.map(({ filename, path }) => ({ filename, path }));
          }
    
          await updateContent.save();
          res.status(200).json({ message: 'Contenido actualizado con éxito' });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error al actualizar contenido' });
      }
    },

    async deleteContent(req, res) {
        try {
          const cntent = await content.findById(req.params.id);
          if (!cntent) {
            res.status(404).json({ message: 'Contenido no encontrado' });
          } else {
            await content.deleteOne(cntent);
            res.json({ message: 'Contenido eliminado con éxito' });
          }
        } catch (error) {
          res.status(400).json({ message: 'Error al eliminar contenido' });
        }
    }
}