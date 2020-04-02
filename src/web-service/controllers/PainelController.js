class PainelController {

    async getDados(req, res){
        return res.status(200).json({message: "a implementar"});
    }

}

module.exports = new PainelController();