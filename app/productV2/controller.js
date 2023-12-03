const path = require('path');
const fs = require('fs');
const Product = require('./model');
const { Op } = require('sequelize');

// Default location of file.
const defaultPath = '../../uploads/public';

const index = async (req, res) => {
    try {
        const { search } = req.query;
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

        res.json(mappingProductData(req, res)(data));
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const view = async (req, res) => {
    try {
        const byuserID = req.params.id;
        let data = await Product.findAll({
            where: { id: byuserID }
        });

        res.json(mappingProductData(req, res)(data));
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const store = async (req, res) => {
    const { id, users_id, name, price, stock, status } = req.body;
    const image = req.file;

    if (image) {
        const target = path.join(__dirname, defaultPath, image.originalname);
        fs.renameSync(image.path, target);
    }

    try {
        const imgUrl = `/public/${image.originalname}`;
        const result = await Product.create({ id, users_id, name, price, stock, status, image_url: imgUrl });

        res.json(result);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const update = async (req, res) => {
    try {
        const byuserID = req.params.id;
        const { id, users_id, name, price, stock, status } = req.body;
        const image = req.file;

        const dataUpdate = {
            id: parseInt(id),
            users_id: parseInt(users_id),
            name,
            price,
            stock,
            status,
        };

        if (image) {
            const target = path.join(__dirname, defaultPath, image.originalname);
            fs.renameSync(image.path, target);

            const imgUrl = `/public/${image.originalname}`;
            dataUpdate['image_url'] = imgUrl;
        }

        const [ProductUpdate] = await Product.update(dataUpdate, {
            where: { id: byuserID },
            returning: true,
        });

        res.json(ProductUpdate);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// TODO:
        // Mising delete file from uploads/public one.

const destroy = async (req, res) => {
    try {
        const byuserID = req.params.id;
        const imageDelete = req.file;

        if (imageDelete) {
            const target = path.join(__dirname, 'uploads', 'public', imageDelete.originalname);
            await fs.unlink(target);
        }
        const ProductDelete = await Product.destroy({
            where: { id: byuserID },
        });
        
        res.json(ProductDelete);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

/**
 * Helper function.
 * 1. Get the full url without any intercept.
 * 2. General Mappers products data.
 */
const fullHostUrl = (req, res) => (req.protocol + '://' + req.get('host'));
const mappingProductData = (req, res) => (data) => {
    const mProduct = data.map((product) => {
        product.image_url = fullHostUrl(req, res) + product.image_url

        return product;
    });

    return mProduct;
}

module.exports = {
    index,
    view,
    store,
    update,
    destroy
}