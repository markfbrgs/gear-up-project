const pool = require('../config/db');
require('dotenv').config();

// Get waitlist items
const getWaitlistItems = async (req, res) => {
    try {
        const query = `
            SELECT 
                w.waitlist_item_id,
                i.item_id,       
                i.item_name,
                i.item_price,
                i.bike_parts,
                w.date_created
            FROM 
                waitlist w
            JOIN 
                items i
            ON 
                w.item_id = i.item_id
            WHERE 
                i.status = true 
            ORDER BY 
                w.date_created DESC;
        `;
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching waitlist items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Add to Frame
const addFrame = async (req, res) => {
    const {
        waitlist_item_id,
        item_id,
        description,
        purpose,
        frame_size,
        head_tube_type,
        head_tube_upper_diameter,
        head_tube_lower_diameter,
        seatpost_diameter,
        axle_type,
        axle_diameter,
        bottom_bracket_type,
        bottom_bracket_width,
        rotor_size,
        max_tire_width,
        rear_hub_width,
        material,
    } = req.body;

    const image = req.file ? req.file.buffer : null;

    try {
        const query = `
            INSERT INTO frame (
                item_id, description, purpose, frame_size, head_tube_type, 
                head_tube_upper_diameter, head_tube_lower_diameter, 
                seatpost_diameter, axle_type, axle_diameter, 
                bottom_bracket_type, bottom_bracket_width, rotor_size, 
                max_tire_width, rear_hub_width,  material, image
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, 
                $10, $11, $12, $13, $14, $15, $16, $17
            ) RETURNING *;
        `;

        const values = [
            item_id,
            description,
            purpose,
            frame_size,
            head_tube_type,
            head_tube_upper_diameter,
            head_tube_lower_diameter,
            seatpost_diameter,
            axle_type,
            axle_diameter,
            bottom_bracket_type,
            bottom_bracket_width,
            rotor_size,
            max_tire_width,
            rear_hub_width,
            material,
            image
        ];


        const result = await pool.query(query, values);

        // Update bb_bu_status in items table
        const updateQuery = `UPDATE items SET bb_bu_status = true, add_part = false WHERE item_id = $1;`;
        await pool.query(updateQuery, [item_id]);

        // Delete the waitlist item
        const deleteQuery = `DELETE FROM waitlist WHERE waitlist_item_id = $1;`;
        await pool.query(deleteQuery, [waitlist_item_id]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding frame:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Add to Fork
const addFork = async (req, res) => {
    const {
        waitlist_item_id,
        item_id,
        description,
        fork_size,
        fork_tube_type,
        fork_tube_upper_diameter,
        fork_tube_lower_diameter,
        fork_travel,
        axle_type,
        axle_diameter,
        suspension_type,
        rotor_size,
        max_tire_width,
        front_hub_width,
        material
    } = req.body;

    const image = req.file ? req.file.buffer : null;

    try {
        const query = `
            INSERT INTO fork (
                item_id, description, fork_size, fork_tube_type, 
                fork_tube_upper_diameter, fork_tube_lower_diameter, 
                fork_travel, axle_type, axle_diameter, suspension_type, 
                rotor_size, max_tire_width, front_hub_width, material, image
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, 
                $10, $11, $12, $13, $14, $15
            ) RETURNING *;
        `;

        const values = [
            item_id,
            description,
            fork_size,
            fork_tube_type,
            fork_tube_upper_diameter,
            fork_tube_lower_diameter,
            fork_travel,
            axle_type,
            axle_diameter,
            suspension_type,
            rotor_size,
            max_tire_width,
            front_hub_width,
            material,
            image
        ];


        const result = await pool.query(query, values);

        // Update bb_bu_status in items table
        const updateQuery = `UPDATE items SET bb_bu_status = true, add_part = false WHERE item_id = $1;`;
        await pool.query(updateQuery, [item_id]);

        // Delete the waitlist item
        const deleteQuery = `DELETE FROM waitlist WHERE waitlist_item_id = $1;`;
        await pool.query(deleteQuery, [waitlist_item_id]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding fork:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Add to Groupset
const addGroupset = async (req, res) => {
    const {
        waitlist_item_id,
        item_id,
        description,
        chainring_speed,
        crank_arm_length,
        front_derailleur_speed,
        rear_derailleur_speed,
        cassette_type,
        cassette_speed,
        chain_speed,
        bottom_bracket_type,
        bottom_bracket_width,
        brake_type,
        rotor_mount_type,
        rotor_size,
    } = req.body;

    const image = req.file ? req.file.buffer : null;

    try {
        const query = `
            INSERT INTO groupset (
                item_id, description, chainring_speed, crank_arm_length,
                front_derailleur_speed, rear_derailleur_speed, cassette_type,
                cassette_speed, chain_speed, bottom_bracket_type,
                bottom_bracket_width, brake_type, rotor_mount_type, rotor_size, 
                image
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, 
                $10, $11, $12, $13, $14, $15
            ) RETURNING *;
        `;

        const values = [
            item_id,
            description,
            chainring_speed,
            crank_arm_length,
            front_derailleur_speed,
            rear_derailleur_speed,
            cassette_type,
            cassette_speed,
            chain_speed,
            bottom_bracket_type,
            bottom_bracket_width,
            brake_type,
            rotor_mount_type,
            rotor_size,
            image
        ];


        const result = await pool.query(query, values);

        // Update bb_bu_status in items table
        const updateQuery = `UPDATE items SET bb_bu_status = true, add_part = false WHERE item_id = $1;`;
        await pool.query(updateQuery, [item_id]);

        // Delete the waitlist item
        const deleteQuery = `DELETE FROM waitlist WHERE waitlist_item_id = $1;`;
        await pool.query(deleteQuery, [waitlist_item_id]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding groupset:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Add to Wheelset
const addWheelset = async (req, res) => {
    const {
        waitlist_item_id,
        item_id,
        description,
        hub_rotor_type,
        hub_cassette_type,
        hub_holes,
        front_hub_width,
        front_hub_axle_type,
        front_hub_axle_diameter,
        rear_hub_width,
        rear_hub_axle_type,
        rear_hub_axle_diameter,
        rear_hub_speed,
        tire_size,
        tire_width,
        rim_spokes,
    } = req.body;

    const image = req.file ? req.file.buffer : null;

    try {
        const query = `
            INSERT INTO wheelset (
                item_id, description, hub_rotor_type, hub_cassette_type, 
                hub_holes, front_hub_width, front_hub_axle_type, front_hub_axle_diameter, 
                rear_hub_width, rear_hub_axle_type, rear_hub_axle_diameter, rear_hub_speed, 
                tire_size, tire_width, rim_spokes, image
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, 
                $10, $11, $12, $13, $14, $15, $16
            ) RETURNING *;
        `;

        const values = [
            item_id,
            description,
            hub_rotor_type,
            hub_cassette_type,
            hub_holes,
            front_hub_width,
            front_hub_axle_type,
            front_hub_axle_diameter,
            rear_hub_width,
            rear_hub_axle_type,
            rear_hub_axle_diameter,
            rear_hub_speed,
            tire_size,
            tire_width,
            rim_spokes,
            image
        ];


        const result = await pool.query(query, values);

        // Update bb_bu_status in items table
        const updateQuery = `UPDATE items SET bb_bu_status = true, add_part = false WHERE item_id = $1;`;
        await pool.query(updateQuery, [item_id]);

        // Delete the waitlist item
        const deleteQuery = `DELETE FROM waitlist WHERE waitlist_item_id = $1;`;
        await pool.query(deleteQuery, [waitlist_item_id]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding wheelset:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Add to Seat
const addSeat = async (req, res) => {
    const {
        waitlist_item_id,
        item_id,
        description,
        seatpost_diameter,
        seatpost_length,
        seat_clamp_type,
        saddle_material,
    } = req.body;

    const image = req.file ? req.file.buffer : null;

    try {
        const query = `
            INSERT INTO seat (
                item_id, description, seatpost_diameter, seatpost_length, 
                seat_clamp_type, saddle_material, image
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7
            ) RETURNING *;
        `;

        const values = [
            item_id,
            description,
            seatpost_diameter,
            seatpost_length,
            seat_clamp_type,
            saddle_material,
            image
        ];


        const result = await pool.query(query, values);

        // Update bb_bu_status in items table
        const updateQuery = `UPDATE items SET bb_bu_status = true, add_part = false WHERE item_id = $1;`;
        await pool.query(updateQuery, [item_id]);

        // Delete the waitlist item
        const deleteQuery = `DELETE FROM waitlist WHERE waitlist_item_id = $1;`;
        await pool.query(deleteQuery, [waitlist_item_id]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding seat:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Add to Cockpit
const addCockpit = async (req, res) => {
    const {
        waitlist_item_id,
        item_id,
        description,
        handlebar_length,
        handlebar_clamp_diameter,
        handlebar_type,
        stem_clamp_diameter,
        stem_length,
        stem_angle,
        stem_fork_diameter,
        headset_type,
        headset_cup_type,
        headset_upper_diameter,
        headset_lower_diameter,
    } = req.body;

    const image = req.file ? req.file.buffer : null;

    try {
        const query = `
            INSERT INTO cockpit (
                item_id, description, handlebar_length,
                handlebar_clamp_diameter, handlebar_type,
                stem_clamp_diameter, stem_length, stem_angle,
                stem_fork_diameter, headset_type, headset_cup_type, 
                headset_upper_diameter, headset_lower_diameter, image
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, 
                $10, $11, $12, $13, $14
            ) RETURNING *;
        `;

        const values = [
            item_id,
            description,
            handlebar_length,
            handlebar_clamp_diameter,
            handlebar_type,
            stem_clamp_diameter,
            stem_length,
            stem_angle,
            stem_fork_diameter,
            headset_type,
            headset_cup_type,
            headset_upper_diameter,
            headset_lower_diameter,
            image
        ];


        const result = await pool.query(query, values);

        // Update bb_bu_status in items table
        const updateQuery = `UPDATE items SET bb_bu_status = true, add_part = false WHERE item_id = $1;`;
        await pool.query(updateQuery, [item_id]);

        // Delete the waitlist item
        const deleteQuery = `DELETE FROM waitlist WHERE waitlist_item_id = $1;`;
        await pool.query(deleteQuery, [waitlist_item_id]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding cockpit:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Add to Headset
const addHeadset = async (req, res) => {
    const {
        waitlist_item_id,
        item_id,
        description,
        headset_type,
        headset_upper_diameter,
        headset_lower_diameter,
        headset_cup_type,
        material,
        weight,
    } = req.body;

    const image = req.file ? req.file.buffer : null;

    try {
        const query = `
            INSERT INTO headset (
                item_id, description, headset_type, headset_upper_diameter, 
                headset_lower_diameter, headset_cup_type, material, weight, 
                image
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9
            ) RETURNING *;
        `;

        const values = [
            item_id,
            description,
            headset_type,
            headset_upper_diameter,
            headset_lower_diameter,
            headset_cup_type,
            material,
            weight,
            image
        ];


        const result = await pool.query(query, values);

        // Update bb_bu_status in items table
        const updateQuery = `UPDATE items SET bb_bu_status = true, add_part = false WHERE item_id = $1;`;
        await pool.query(updateQuery, [item_id]);

        // Delete the waitlist item
        const deleteQuery = `DELETE FROM waitlist WHERE waitlist_item_id = $1;`;
        await pool.query(deleteQuery, [waitlist_item_id]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding headset:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Add to Handlebar
const addHandlebar = async (req, res) => {
    const {
        waitlist_item_id,
        item_id,
        description,
        handlebar_length,
        handlebar_clamp_diameter,
        handlebar_type,
        material,
        weight,
    } = req.body;

    const image = req.file ? req.file.buffer : null;

    try {
        const query = `
            INSERT INTO handlebar (
                item_id, description, handlebar_length, handlebar_clamp_diameter, 
                handlebar_type, material, weight, image
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8
            ) RETURNING *;
        `;

        const values = [
            item_id,
            description,
            handlebar_length,
            handlebar_clamp_diameter,
            handlebar_type,
            material,
            weight,
            image
        ];


        const result = await pool.query(query, values);

        // Update bb_bu_status in items table
        const updateQuery = `UPDATE items SET bb_bu_status = true, add_part = false WHERE item_id = $1;`;
        await pool.query(updateQuery, [item_id]);

        // Delete the waitlist item
        const deleteQuery = `DELETE FROM waitlist WHERE waitlist_item_id = $1;`;
        await pool.query(deleteQuery, [waitlist_item_id]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding handlebar:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Add to Stem
const addStem = async (req, res) => {
    const {
        waitlist_item_id,
        item_id,
        description,
        stem_clamp_diameter,
        stem_length,
        stem_angle,
        material,
        weight,
    } = req.body;

    const image = req.file ? req.file.buffer : null;

    try {
        const query = `
            INSERT INTO stem (
                item_id, description, stem_clamp_diameter, stem_length, 
                stem_angle, material, weight, image
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8
            ) RETURNING *;
        `;

        const values = [
            item_id,
            description,
            stem_clamp_diameter,
            stem_length,
            stem_angle,
            material,
            weight,
            image
        ];


        const result = await pool.query(query, values);

        // Update bb_bu_status in items table
        const updateQuery = `UPDATE items SET bb_bu_status = true, add_part = false WHERE item_id = $1;`;
        await pool.query(updateQuery, [item_id]);

        // Delete the waitlist item
        const deleteQuery = `DELETE FROM waitlist WHERE waitlist_item_id = $1;`;
        await pool.query(deleteQuery, [waitlist_item_id]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding stem:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Add to Hubs
const addHubs = async (req, res) => {
    const {
        waitlist_item_id,
        item_id,
        description,
        hub_type,
        hub_speed,
        hub_holes,
        axle_type,
        rotor_type,
        material,
        weight,
    } = req.body;

    const image = req.file ? req.file.buffer : null;

    try {
        const query = `
            INSERT INTO hubs (
                item_id, description, hub_type, hub_speed, 
                hub_holes, axle_type, rotor_type, material, 
                weight, image
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
            ) RETURNING *;
        `;

        const values = [
            item_id,
            description,
            hub_type,
            hub_speed,
            hub_holes,
            axle_type,
            rotor_type,
            material,
            weight,
            image
        ];


        const result = await pool.query(query, values);

        // Update bb_bu_status in items table
        const updateQuery = `UPDATE items SET bb_bu_status = true, add_part = false WHERE item_id = $1;`;
        await pool.query(updateQuery, [item_id]);

        // Delete the waitlist item
        const deleteQuery = `DELETE FROM waitlist WHERE waitlist_item_id = $1;`;
        await pool.query(deleteQuery, [waitlist_item_id]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding hubs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete hubs item
const deleteWaitlistItem = async (req, res) => {
    const { waitlist_item_id } = req.params;

    try {
        const getItemQuery = `
            SELECT item_id FROM waitlist WHERE waitlist_item_id = $1;
        `;
        const getItemResult = await pool.query(getItemQuery, [waitlist_item_id]);

        if (getItemResult.rowCount === 0) {
            return res.status(404).json({ message: 'Waitlist item not found' });
        }

        const item_id = getItemResult.rows[0].item_id;

        const deleteQuery = `
            DELETE FROM waitlist WHERE waitlist_item_id = $1 RETURNING *;
        `;
        const deleteResult = await pool.query(deleteQuery, [waitlist_item_id]);

        const updateItemQuery = `
            UPDATE items
            SET add_part = FALSE, bike_parts = NULL
            WHERE item_id = $1
            RETURNING *;
        `;
        const updateResult = await pool.query(updateItemQuery, [item_id]);

        res.status(200).json({
            message: 'Item deleted successfully',
            waitlist: deleteResult.rows[0],
            updatedItem: updateResult.rows[0]
        });
    } catch (error) {
        console.error('Error deleting waitlist item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getWaitlistItems,
    addFrame,
    addFork,
    addGroupset,
    addWheelset,
    addSeat,
    addCockpit,
    addHeadset,
    addHandlebar,
    addStem,
    addHubs,
    deleteWaitlistItem
};