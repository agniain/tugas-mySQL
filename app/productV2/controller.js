const path = require('path');
const fs = require('fs');
const Product = require('./model');
const { Op } = require('sequelize');


const index = async (req, res) => {
    try { 
        const {search} = req.query;
        let data = {};

        if (search) {
            data = await Product.findAll({
                where: {
                    name: {
                        [Op.like]: [`%${search}%`]
                    },
                },
            }); 
        } else {
            data = await Product.findAll();
        } 
        
        res.json(data);

    } catch (e) {
        console.error(e); 
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const view = async (req, res) => {
    try {
        const byuserID = req.params.id;
        let data = await Product.findAll({ 
            where: {id: byuserID}
        });
         
        res.json(data);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}     

const store = async (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
    }
    try {
        await Product.sync();
        const result = await Product.create({users_id, name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}`});
        res.json(result);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const update = async (req, res) => {
    try {
        const {users_id, name, price, stock, status} = req.body;
        const image = req.file;

        let dataUpdate = {
            users_id: parseInt(users_id),
            name,
            price,
            stock,
            status,
        };

        if (image) {
            const target = path.join(__dirname, '../../uploads', image.originalname);
            fs.renameSync(image.path, target);
            imageUpdate['image_url'] = `http://localhost:3000/public/${image.originalname}`;
        }
        
        const byuserID = req.params.id;

        const [ProdukUpdate] = await Product.update(dataUpdate, {
            where: {id: byuserID},
            returning: true,
        });
        res.json(ProdukUpdate);
    } catch (e) {
        console.error(e); 
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const destroy = async (req, res) => {
    try{
        const byuserID = req.params.id;
        const ProdukDelete = await Product.destroy({
            where: {id: byuserID},            
        });
        res.json(ProdukDelete);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    index,
    view,
    store,
    update,
    destroy
}