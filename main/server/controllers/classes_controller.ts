export function classes_controller(req, res) {
    res.status(200).json({
        classes: {
            thief: true,
            warrior: true,
            mage: true
        }
    })
}