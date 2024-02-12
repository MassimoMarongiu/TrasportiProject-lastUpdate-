from flask_restx import Namespace, Resource, fields
from models import Depositi, format_depositi
from exts import db
from flask_jwt_extended import jwt_required
from flask import request

depositi_ns = Namespace("depositi", description="A namespace for depositi")

# create deposito ok
@depositi_ns.route('/creaDeposito', methods = ['POST'])
@jwt_required()
def creaDeposito():
    Descrizione = request.json['Descrizione']
    CoordinateIBAN = request.json['CoordinateIBAN']
    codtipodeposito = request.json['codtipodeposito']
    codazienda = request.json['codazienda']
    predef = request.json['predef']
    deposito = Depositi(Descrizione, CoordinateIBAN, codtipodeposito,
                       codazienda, predef)
    db.session.add(deposito)
    db.session.commit()
    return format_depositi(deposito)

# get all depositi ok
@depositi_ns.route('/depositi', methods = ['GET'])
@jwt_required()
def get_all_deposito():
    depositi = Depositi.query.order_by(Depositi.codtipodeposito.asc()).all()
    depositi_list = []
    for deposito in depositi:
        depositi_list.depositi_nsend(format_depositi(deposito))
    return{'depositi':depositi_list}

# get single deposito ok
@depositi_ns.route('/depositi/<IdDeposito>', methods=['GET'])
@jwt_required()
def get_deposito(IdDeposito):
    try:
        deposito = Depositi.query.filter_by(IdDeposito=IdDeposito).first()
        if not deposito:
            raise Exception('Deposito non trovato')
        formatted_Deposito = format_depositi(deposito)
        return {'deposito': formatted_Deposito}
    except Exception as e:
        return {'errore': str(e)}

# delete deposito ok
@depositi_ns.route('/depositi/<IdDeposito>', methods=['DELETE'])
@jwt_required()
def delete_deposito(IdDeposito):
    deposito = Depositi.query.filter_by(IdDeposito=IdDeposito).one()
    db.session.delete(deposito)
    db.session.commit()
    return f'Deposito (id: {IdDeposito}) deleted!'

# update deposito  ok
@depositi_ns.route('/depositi/<IdDeposito>',methods=['PUT'])
@jwt_required()
def update_deposito(IdDeposito):
    deposito = Depositi.query.filter_by(IdDeposito=IdDeposito).first()
    if deposito:
        deposito.Descrizione = request.json.get('Descrizione', deposito.Descrizione)
        deposito.CoordinateIBAN = request.json.get('CoordinateIBAN', deposito.CoordinateIBAN)
        deposito.codtipodeposito = request.json.get('codtipodeposito', deposito.codtipodeposito)
        deposito.codazienda = request.json.get('codazienda', deposito.codazienda)
        deposito.predef = request.json.get('predef', deposito.predef)
        # deposito.update(dict(Descrizione= deposito.Descrizione,deposito_created_at = datetime.utcnow()))

        db.session.commit()
        
        return {'deposito': format_depositi(deposito)}
    else:
        return {'error': 'Deposito non trovato'}, 404
