from flask import Flask,request,jsonify,make_response,session
from flask_restx import Api,Resource,fields
# from config import DevConfig
from models import User,Anagrafica,Depositi,DescrizioneTrasporto,Documenti,LocalitaTrasporti,TipoBolla,TipoPagamento,Trasporti
from models import format_login,format_Anagrafica,format_depositi,format_documenti, format__descrizione_trasporti,format_localita_trasporti,format_tipo_bolla,format_tipo_pagamento,format_trasporti
from exts import db
from datetime import datetime
from werkzeug.security import generate_password_hash,check_password_hash
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    jwt_required,
)
from flask_cors import CORS
from datetime import timedelta # tempo refresh token
from Indirizzo_Ip import ottieni_indirizzo_ip

app= Flask(__name__)
# app.config.from_object(config)

CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:M4ss1m0M4r0ng1u@localhost/trasportiproject'
app.config['JWT_SECRET_KEY'] = 'ef3e21f044e5362e45863349'  
# tempo refresh token
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=0.3333)  # Set the desired expiration time

db.init_app(app)

JWTManager(app)

api = Api(app,doc='/docs')

# @api.route('/hello')
# class HelloResource(Resource):
#     def get(self):
#         return {"message":"hello"}
    
@app.shell_context_processor
def make_shell_context():
    return{
        "db":db,
        "Anagrafica":Anagrafica,
        "Depositi":Depositi,
        "DescrizioneTrasporto":DescrizioneTrasporto,
        "Documenti":Documenti,
        "LocalitaTrasporti":LocalitaTrasporti,
        "TipoBolla":TipoBolla,
        "TipoPagamento":TipoPagamento,
        "Trasporti":Trasporti
    }

#  ----------------------------------------------------------
# users
#  ----------------------------------------------------------

# ottieni indirizzo

signup_model= api.model(
    "SignUp",
    {
        "username": fields.String(),
        "email": fields.String(),
        "password": fields.String()
    }
)

login_model = api.model(
    "Login", {"username": fields.String(), "password": fields.String()}
)

MAX_LOGIN_ATTEMPTS = 3
BLOCK_PERIOD_MINUTES = 10
BLOCKED_NUMBER_TIMES = 0 # numero di volte che son stato bloccato

@api.route('/login')
class Login(Resource):
    @api.expect(login_model)
    def post(self):
        data= request.get_json()

        username = data.get('username')
        password = data.get('password')
        
        ottieni_indirizzo_ip()
        if(ottieni_indirizzo_ip()=="192.168.1.5"):
            print("----------------ip 192.168.1.5")
        else:
            print("----------------ip non valido ")
            # bisogna fare una chiamata post per i tentativi di login che registra gli ip in db
            # per la verifica del login, bisogna fare una chiamata get per il numero di tentativi di login in session
            # se l'utente non è registrato, bisogna fare una chiamata post per i tentativi di login che registra gli ip in db
            # associare i tentativi di login in session
            # associare se i tentativi sono maggiori di quelli consentiti 
            
    # Controlla se l'account è bloccato      
        if 'blocked_until' in session and session['blocked_until'] > datetime.utcnow():
            return jsonify({"message": f"Account blocked. Try again after {BLOCK_PERIOD_MINUTES} minutes."}), 403

        db_user = User.query.filter_by(username=username).first()
        if db_user and check_password_hash(db_user.password, password):
            access_token = create_access_token(identity=db_user.username)
            refresh_token = create_refresh_token(identity=db_user.username)
            print("access_token "+access_token)
            print("refresh_token "+refresh_token)
            BLOCK_PERIOD_MINUTES = 10
            BLOCKED_NUMBER_TIMES = 0
            return jsonify(
                {"access_token": access_token, "refresh_token": refresh_token}
            )

        else:
             # Se le credenziali sono errate, incrementa i tentativi
            session['login_attempts'] = session.get('login_attempts', 0) + 1
            SESSION_ATTEMPTS = 3-session['login_attempts']
            # Se raggiunge il numero massimo di tentativi, blocca l'account
            if session['login_attempts'] >= MAX_LOGIN_ATTEMPTS and BLOCKED_NUMBER_TIMES == 0:
                blocked_until = datetime.utcnow() + timedelta(minutes=BLOCK_PERIOD_MINUTES)
                session['blocked_until'] = blocked_until
                BLOCKED_NUMBER_TIMES += 1
                return jsonify({"message": f"Too many login attempts. Account blocked. Try again after {BLOCK_PERIOD_MINUTES} minutes."}), 403
            # Aggiustato l'uso di BLOCKED_NUMBER_TIMES come variabile
            elif session['login_attempts'] >= MAX_LOGIN_ATTEMPTS and BLOCKED_NUMBER_TIMES == 1:
                BLOCKED_NUMBER_TIMES += 1
                BLOCK_PERIOD_MINUTES += 50
                return jsonify({"message": f"Too many login attempts. Account blocked. Try again after {BLOCK_PERIOD_MINUTES} minutes."}), 403
            elif session['login_attempts'] >= MAX_LOGIN_ATTEMPTS and BLOCKED_NUMBER_TIMES == 2:
                BLOCKED_NUMBER_TIMES += 1
                BLOCK_PERIOD_MINUTES += 420
                return jsonify({"message": f"Too many login attempts. Account blocked. Try again after {BLOCK_PERIOD_MINUTES} minutes."}), 403
            elif session['login_attempts'] >= MAX_LOGIN_ATTEMPTS and BLOCKED_NUMBER_TIMES == 3:
                BLOCKED_NUMBER_TIMES += 1
                BLOCK_PERIOD_MINUTES += 120000000000
                # Se raggiunge il numero massimo di tentativi, blocca l'account
                return jsonify({"message": f"Too many login attempts. Account blocked. Try again after {BLOCK_PERIOD_MINUTES} minutes."}), 403

            return jsonify({"message": "Invalid username or password! attempts remained {SESSION_ATTEMPTS}"})


@api.route("/refresh")
class RefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user)
        return make_response(jsonify({"access_token": new_access_token}), 200)
    
@app.route("/login")
@jwt_required()
def home():
    return (jsonify(verifylog="ok"))

@app.route("/")
@jwt_required()
def homeloggin():
    return "ok"

# @api.route('/signup')
# @api.expect(signup_model)
# class Signup(Resource):
#     @api.expect(signup_model)
#     def post(self):
#         data= request.get_json()

#         username= data.get('username')

#         db_user=User.query.filter_by(username= username).first()

#         if db_user is not None:
#             return jsonify({"message":f"user with username {username} already exists"})

#         new_user=User(
#             username= data.get('username'),
#             email= data.get('email'),
#             password=generate_password_hash(data.get('password'))
#         )
        
#         new_user.save()
#         return jsonify({"message":"User created successfully"})
        # return new_user,201

# Imposta il numero massimo di tentativi errati e il periodo di blocco in minuti



#  ----------------------------------------------------------
#anagrafica
#  ----------------------------------------------------------
    
# create anagrafica ok

@app.route('/creaAnagrafica', methods = ['POST'])
@jwt_required()
def creaAnagrafica():
    ragionesociale = request.json['ragionesociale']
    partitaiva = request.json['partitaiva']
    codicefiscale = request.json['codicefiscale']
    localita = request.json['localita']
    indirizzo = request.json['indirizzo']
    prov = request.json['prov']
    cap = request.json['cap']
    telefono1 = request.json['telefono1']
    telefono2 = request.json['telefono2']
    fax = request.json['fax']
    email = request.json['email']
    attivo = request.json['attivo']
    estero = request.json['estero']
    nazionale = request.json['nazionale']
    codtipopagamento = request.json['codtipopagamento']
    CodCategoriaSconto = request.json['CodCategoriaSconto']
    cli_for = request.json['cli_for']
    vettore = request.json['vettore']
    tipo_cliente = request.json['tipo_cliente']
    scontopredlistino = request.json['scontopredlistino']
    anagrafica = Anagrafica(ragionesociale, partitaiva, codicefiscale, localita, indirizzo, prov,
                       cap, telefono1, telefono2, fax, email, attivo, estero,nazionale, codtipopagamento,
                       CodCategoriaSconto, cli_for,vettore, tipo_cliente, scontopredlistino)
                         
    db.session.add(anagrafica)
    db.session.commit()
    return format_Anagrafica(anagrafica)

# get all anagrafica ok
@app.route('/anagrafica', methods = ['GET'])
@jwt_required()
def get_all_anagrafica():
    anagrafiche = Anagrafica.query.order_by(Anagrafica.ragionesociale.desc()).all()
    anagrafica_list = []
    for anagrafica in anagrafiche:
        anagrafica_list.append(format_Anagrafica(anagrafica))
    return{'anagrafica':anagrafica_list}

# get single anagrafica ok
@app.route('/anagrafica/<idanagrafica>', methods = ['GET'])
@jwt_required()
def get_anagrafica(idanagrafica):
    try:
        anagrafica = Anagrafica.query.filter_by(idanagrafica=idanagrafica).first()
        if not anagrafica:
            raise Exception('Anagrafica non trovata')
        formatted_Anagrafica = format_Anagrafica(anagrafica)
        return {'anagrafica':formatted_Anagrafica}
    except Exception as e:
        return {'errore': str(e)}
  
# delete anagrafica
@app.route('/anagrafica/<idanagrafica>', methods=['DELETE'])
@jwt_required()
def delete_anagrafica(idanagrafica):
    anagrafica = Anagrafica.query.filter_by(idanagrafica=idanagrafica).first()
    db.session.delete(anagrafica)
    db.session.commit()
    return f'anagrafica (id: {idanagrafica}) deleted!'


# update anagrafica ok
@app.route('/anagrafica/<idanagrafica>',methods=['PUT'])
@jwt_required()
def update_anagrafica(idanagrafica):
    anagrafica = Anagrafica.query.filter_by(idanagrafica=idanagrafica).first()
    
    if anagrafica:
        anagrafica.ragionesociale = request.json.get('ragionesociale', anagrafica.ragionesociale)
        anagrafica.partitaiva = request.json.get('partitaiva', anagrafica.partitaiva)
        anagrafica.codicefiscale = request.json.get('codicefiscale', anagrafica.codicefiscale)
        anagrafica.localita = request.json.get('localita', anagrafica.localita)
        anagrafica.indirizzo = request.json.get('indirizzo', anagrafica.indirizzo)
        anagrafica.prov = request.json.get('prov', anagrafica.prov)
        anagrafica.cap = request.json.get('cap', anagrafica.cap)
        anagrafica.telefono1 = request.json.get('telefono1', anagrafica.telefono1)
        anagrafica.telefono2 = request.json.get('telefono2', anagrafica.telefono2)
        anagrafica.fax = request.json.get('fax', anagrafica.fax)
        anagrafica.email = request.json.get('email', anagrafica.email)
        anagrafica.attivo = request.json.get('attivo', anagrafica.attivo)
        anagrafica.estero = request.json.get('estero', anagrafica.estero)
        anagrafica.nazionale = request.json.get('nazionale', anagrafica.nazionale)
        anagrafica.codtipopagamento = request.json.get('codtipopagamento', anagrafica.codtipopagamento)
        anagrafica.CodCategoriaSconto = request.json.get('CodCategoriaSconto', anagrafica.CodCategoriaSconto)
        anagrafica.cli_for = request.json.get('cli_for', anagrafica.cli_for)
        anagrafica.vettore = request.json.get('vettore', anagrafica.vettore)
        anagrafica.tipo_cliente = request.json.get('tipo_cliente', anagrafica.tipo_cliente)
        anagrafica.scontopredlistino = request.json.get('scontopredlistino', anagrafica.scontopredlistino)

        db.session.commit()
        
        return {'anagrafica': format_Anagrafica(anagrafica)}
    else:
        return {'error': 'anagrafica non trovata'}, 404

#  ----------------------------------------------------------
# depositi
#  ----------------------------------------------------------

# create deposito ok
@app.route('/creaDeposito', methods = ['POST'])
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
@app.route('/depositi', methods = ['GET'])
@jwt_required()
def get_all_deposito():
    depositi = Depositi.query.order_by(Depositi.IdDeposito.desc()).all()
    depositi_list = []
    for deposito in depositi:
        depositi_list.append(format_depositi(deposito))
    return{'depositi':depositi_list}

# get single deposito ok
@app.route('/depositi/<IdDeposito>', methods=['GET'])
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
@app.route('/depositi/<IdDeposito>', methods=['DELETE'])
@jwt_required()
def delete_deposito(IdDeposito):
    deposito = Depositi.query.filter_by(IdDeposito=IdDeposito).one()
    db.session.delete(deposito)
    db.session.commit()
    return f'Deposito (id: {IdDeposito}) deleted!'

# update deposito  ok
@app.route('/depositi/<IdDeposito>',methods=['PUT'])
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

#  ----------------------------------------------------------
# DescrizioneTrasporti
#  ----------------------------------------------------------
    
# create DescrizioneTrasporti ok
@app.route('/creaDescrizioneTrasporti', methods = ['POST'])
@jwt_required()
def creaTrasporto():
    descrizione = request.json['descrizione']
    visibile = request.json['visibile']
    descrizione_trasporto = DescrizioneTrasporto(descrizione, visibile)
    db.session.add(descrizione_trasporto)
    db.session.commit()
    return format__descrizione_trasporti(descrizione_trasporto)

# get all DescrizioneTrasporti ok
@app.route('/descrizioneTrasporti', methods = ['GET'])
@jwt_required()
def get_all_descrizioneTrasporti():
    descrizioneTrasporti = DescrizioneTrasporto.query.order_by(DescrizioneTrasporto.iddescrizione.desc()).all()
    descrizioneTrasporti_list = []
    for descrizioneTrasporto in descrizioneTrasporti:
        descrizioneTrasporti_list.append(format__descrizione_trasporti(descrizioneTrasporto))
    return{'descrizioneTrasporti':descrizioneTrasporti_list}

# get single DescrizioneTrasporti ok 
@app.route('/descrizioneTrasporti/<iddescrizione>', methods = ['GET'])
@jwt_required()
def get_descrizioneTrasporto(iddescrizione):
    try:
        descrizioneTrasporto = DescrizioneTrasporto.query.filter_by(iddescrizione=iddescrizione).first()
        if not descrizioneTrasporto:
            raise Exception('descrizione trasporto non trovata')
        formatted__descrizione_trasporti = format__descrizione_trasporti(descrizioneTrasporto)
        return {'descrizioneTrasporto':formatted__descrizione_trasporti}
    except Exception as e:
        return {'errore': str(e)}
  
# delete descrizioneTrasporto ok
@app.route('/descrizioneTrasporti/<iddescrizione>', methods=['DELETE'])
@jwt_required()
def delete_descrizione_trasporto(iddescrizione):
    descrizioneTrasporto = DescrizioneTrasporto.query.filter_by(iddescrizione=iddescrizione).one()
    db.session.delete(descrizioneTrasporto)
    db.session.commit()
    return f'descrizioneTrasporti (id: {iddescrizione}) deleted!'

# update descrizioneTrasporti ok
@app.route('/descrizioneTrasporti/<iddescrizione>',methods=['PUT'])
@jwt_required()
def update_descrizioneTrasporti(iddescrizione):
    descrizioneTrasporto = DescrizioneTrasporto.query.filter_by(iddescrizione=iddescrizione).first()
    
    if descrizioneTrasporto:
        descrizioneTrasporto.descrizione = request.json.get('descrizione', descrizioneTrasporto.descrizione)
        descrizioneTrasporto.visibile = request.json.get('visibile', descrizioneTrasporto.visibile)
      # deposito.update(dict(Descrizione= deposito.Descrizione,created_at = datetime.utcnow()))
        # deposito.descrizione_created_at = request.json.get('deposito_created_at', created_at = datetime.utcnow())
        db.session.commit()
        
        return {'descrizioneTrasporto': format__descrizione_trasporti(descrizioneTrasporto)}
    else:
        return {'error': 'descrizione Trasporto non trovato'}, 404

#  ----------------------------------------------------------
# documenti    
#  ----------------------------------------------------------
  
# create documenti ok
@app.route('/creaDocumento', methods = ['POST'])
@jwt_required()
def creaDocumento():
    CodTipoDocumento = request.json['CodTipoDocumento']
    Numero = request.json['Numero']
    DataDocumento = request.json['DataDocumento']
    CodAgente = request.json['CodAgente']
    CodIntestatario = request.json['CodIntestatario']
    intestatario_ragionesociale = request.json['intestatario_ragionesociale']
    intestatario_partitaiva = request.json['intestatario_partitaiva']
    intestatario_codicefiscale = request.json['intestatario_codicefiscale']
    intestatario_localita = request.json['intestatario_localita']
    intestatario_prov = request.json['intestatario_prov']
    intestatario_indirizzo = request.json['intestatario_indirizzo']
    intestatario_cap = request.json['intestatario_cap']
    DataAccettazione = request.json['DataAccettazione']
    PreAttivo = request.json['PreAttivo']
    DDT_Destinazione = request.json['DDT_Destinazione']
    ddt_indirizzo = request.json['ddt_indirizzo']
    ddt_localita = request.json['ddt_localita']
    ddt_cap = request.json['ddt_cap']
    ddt_prov = request.json['ddt_prov']
    CodModPagamento = request.json['CodModPagamento']
    DDT_Vettore = request.json['DDT_Vettore']
    DDT_TrasportoMezzo = request.json['DDT_TrasportoMezzo']
    DDT_AspettoBeni = request.json['DDT_AspettoBeni']
    DDT_NumeroColli = request.json['DDT_NumeroColli']
    DDT_DataOraInizio = request.json['DDT_DataOraInizio']
    DDT_DataOraRitiro = request.json['DDT_DataOraRitiro']
    DDT_Porto = request.json['DDT_Porto']
    DDT_CausaleTrasporto = request.json['DDT_CausaleTrasporto']
    accompagnatoria = request.json['accompagnatoria']
    codddt = request.json['codddt']
    RifDDT = request.json['RifDDT']
    Attivo = request.json['Attivo']
    Imponibile = request.json['Imponibile']
    IVA = request.json['IVA']
    Totale = request.json['Totale']
    Tipologia = request.json['Tipologia']
    QuantitaPeso = request.json['QuantitaPeso']
    LuogoCarico = request.json['LuogoCarico']
    LuogoScarico = request.json['LuogoScarico']
    documento = Documenti(CodTipoDocumento, Numero, DataDocumento, CodAgente, CodIntestatario,
                            intestatario_ragionesociale, intestatario_partitaiva, intestatario_codicefiscale,intestatario_localita, intestatario_prov,
                             intestatario_indirizzo, intestatario_cap,DataAccettazione,PreAttivo, DDT_Destinazione,
                             ddt_indirizzo, ddt_localita, ddt_cap,ddt_prov,CodModPagamento, DDT_Vettore, DDT_TrasportoMezzo,DDT_AspettoBeni,
                               DDT_NumeroColli,DDT_DataOraInizio,DDT_DataOraRitiro,DDT_Porto,  DDT_CausaleTrasporto, 
                              accompagnatoria, codddt,RifDDT,Attivo, Imponibile,
                              IVA, Totale, Tipologia,QuantitaPeso,LuogoCarico,LuogoScarico 
                      )
    
    db.session.add(documento)
    db.session.commit()
    return format_documenti(documento)

# get all documenti ok
@app.route('/documenti', methods = ['GET'])
@jwt_required()
def get_all_documenti():
    documenti = Documenti.query.order_by(Documenti.intestatario_ragionesociale.desc()).all()
    documenti_list = []
    for documento in documenti:
        documenti_list.append(format_documenti(documento))
    return{'documenti':documenti_list}

# get single documenti ok
@app.route('/documenti/<idDocumento>', methods = ['GET'])
@jwt_required()
def get_documenti(idDocumento):
    try:
        documento = Documenti.query.filter_by(idDocumento=idDocumento).first()
        if not documento:
            raise Exception('documento non trovato')
        formatted_documenti = format_documenti(documento)
        return {'documento':formatted_documenti}
    except Exception as e:
        return {'errore': str(e)}
  
# delete documenti ok
@app.route('/documenti/<idDocumento>', methods=['DELETE'])
@jwt_required()
def delete_documento(idDocumento):
    documento = Documenti.query.filter_by(idDocumento=idDocumento).one()
    db.session.delete(documento)
    db.session.commit()
    return f'documento (id: {idDocumento}) deleted!'


# update documenti ok
@app.route('/documenti/<idDocumento>',methods=['PUT'])
@jwt_required()
def update_documento(idDocumento):
    documento = Documenti.query.filter_by(idDocumento=idDocumento).first()
    
    if documento:
        documento.CodTipoDocumento = request.json.get('CodTipoDocumento', documento.CodTipoDocumento)
        documento.Numero = request.json.get('Numero', documento.Numero)
        documento.DataDocumento = request.json.get('DataDocumento', documento.DataDocumento)
        documento.CodAgente = request.json.get('CodAgente', documento.CodAgente)
        documento.CodIntestatario = request.json.get('CodIntestatario', documento.CodIntestatario)
        documento.intestatario_ragionesociale = request.json.get('intestatario_ragionesociale', documento.intestatario_ragionesociale)
        documento.intestatario_codicefiscale = request.json.get('intestatario_codicefiscale', documento.intestatario_codicefiscale)
        documento.intestatario_localita = request.json.get('intestatario_localita', documento.intestatario_localita)
        documento.intestatario_prov = request.json.get('intestatario_prov', documento.intestatario_prov)
        documento.intestatario_indirizzo = request.json.get('intestatario_indirizzo', documento.intestatario_indirizzo)
        documento.intestatario_cap = request.json.get('intestatario_cap', documento.intestatario_cap)
        documento.DataAccettazione = request.json.get('DataAccettazione', documento.DataAccettazione)
        documento.PreAttivo = request.json.get('PreAttivo', documento.PreAttivo)
        documento.DDT_Destinazione = request.json.get('DDT_Destinazione', documento.DDT_Destinazione)
        documento.ddt_indirizzo = request.json.get('ddt_indirizzo', documento.ddt_indirizzo)
        documento.ddt_localita = request.json.get('ddt_localita', documento.ddt_localita)
        documento.ddt_cap = request.json.get('ddt_cap', documento.ddt_cap)
        documento.ddt_prov = request.json.get('ddt_prov', documento.ddt_prov)
        documento.CodModPagamento = request.json.get('CodModPagamento', documento.CodModPagamento)
        documento.DDT_Vettore = request.json.get('DDT_Vettore', documento.DDT_Vettore)
        documento.DDT_TrasportoMezzo = request.json.get('DDT_TrasportoMezzo', documento.DDT_TrasportoMezzo)
        documento.DDT_AspettoBeni = request.json.get('DDT_AspettoBeni', documento.DDT_AspettoBeni)
        documento.DDT_NumeroColli = request.json.get('DDT_NumeroColli', documento.DDT_NumeroColli)
        documento.DDT_DataOraInizio = request.json.get('DDT_DataOraInizio', documento.DDT_DataOraInizio)
        documento.DDT_DataOraRitiro = request.json.get('DDT_DataOraRitiro', documento.DDT_DataOraRitiro)
        documento.DDT_Porto = request.json.get('DDT_Porto', documento.DDT_Porto)
        documento.DDT_CausaleTrasporto = request.json.get('DDT_CausaleTrasporto', documento.DDT_CausaleTrasporto)
        documento.accompagnatoria = request.json.get('accompagnatoria', documento.accompagnatoria)
        documento.codddt = request.json.get('codddt', documento.codddt)
        documento.RifDDT = request.json.get('RifDDT', documento.RifDDT)
        documento.Attivo = request.json.get('Attivo', documento.Attivo)
        documento.Imponibile = request.json.get('Imponibile', documento.Imponibile)
        documento.IVA = request.json.get('IVA', documento.IVA)
        documento.Totale = request.json.get('Totale', documento.Totale)
        documento.Tipologia = request.json.get('Tipologia', documento.Tipologia)
        documento.QuantitaPeso = request.json.get('QuantitaPeso', documento.QuantitaPeso)
        documento.LuogoCarico = request.json.get('LuogoCarico', documento.LuogoCarico)
        documento.LuogoScarico = request.json.get('LuogoScarico', documento.LuogoScarico)

        db.session.commit()
        
        return {'documento': format_documenti(documento)}
    else:
        return {'error': 'documento non trovato'}, 404

#  ----------------------------------------------------------
# localita trasporti
#  ----------------------------------------------------------
    
# create LocalitaTrasporti ok
@app.route('/creaLocalitaTrasporti', methods = ['POST'])
@jwt_required()
def creaLocalitaTrasporti():
    descrizione = request.json['descrizione']
    provincia = request.json['provincia']
    cap = request.json['cap']
    visibile = request.json['visibile']
    arrivo = request.json['arrivo']
    localitaTrasporti = LocalitaTrasporti(descrizione, provincia, cap, visibile, arrivo)
    db.session.add(localitaTrasporti)
    db.session.commit()
    return format_localita_trasporti(localitaTrasporti)

# get all LocalitaTrasporti ok
@app.route('/localitaTrasporti', methods = ['GET'])
@jwt_required()
def get_all_localitaTrasporti():
    localitaTrasporti = LocalitaTrasporti.query.order_by(LocalitaTrasporti.descrizione.desc()).all()
    localitaTrasportiList = []
    for localitaTrasporto in localitaTrasporti:
        localitaTrasportiList.append(format_localita_trasporti(localitaTrasporto))
    return{'localitaTrasporti':localitaTrasportiList}

# get single LocalitaTrasporti ok
@app.route('/localitaTrasporti/<idlocalita>', methods = ['GET'])
@jwt_required()
def get_localitaTrasporti(idlocalita):
    try:
        localitaTrasporto = LocalitaTrasporti.query.filter_by(idlocalita=idlocalita).one()
        if not localitaTrasporto:
            raise Exception('localitaTrasporti non trovato')
        formatted_localita_trasporti = format_localita_trasporti(localitaTrasporto)
        return {'localitaTrasporto':formatted_localita_trasporti}
    except Exception as e:
        return {'errore': str(e)}
  
# delete LocalitaTrasporti ok
@app.route('/localitaTrasporti/<idlocalita>', methods=['DELETE'])
@jwt_required()
def delete_localitaTrasporti(idlocalita):
    localitaTrasporto = LocalitaTrasporti.query.filter_by(idlocalita=idlocalita).one()
    db.session.delete(localitaTrasporto)
    db.session.commit()
    return f'localita Trasporti (id: {idlocalita}) deleted!'

# update LocalitaTrasporti ok
@app.route('/localitaTrasporti/<idlocalita>',methods=['PUT'])
@jwt_required()
def update_localitaTrasporti(idlocalita):
    localitaTrasporto = LocalitaTrasporti.query.filter_by(idlocalita=idlocalita).first()
    
    if localitaTrasporto:
        localitaTrasporto.descrizione = request.json.get('descrizione', localitaTrasporto.descrizione)
        localitaTrasporto.provincia = request.json.get('provincia', localitaTrasporto.provincia)
        localitaTrasporto.cap = request.json.get('cap', localitaTrasporto.cap)
        localitaTrasporto.visibile = request.json.get('visibile', localitaTrasporto.visibile)
        localitaTrasporto.arrivo = request.json.get('arrivo', localitaTrasporto.arrivo)
        # localitaTrasporto.update(dict(descrizione= deposito.descrizione,localita_trasporto_created_at = datetime.utcnow()))


        db.session.commit()
        
        return {'azienda': format_localita_trasporti(localitaTrasporto)}
    else:
        return {'error': 'localita Trasporto non trovata'}, 404
 
#  ----------------------------------------------------------
# tipo bolla
#  ----------------------------------------------------------
    
# create tipo bolla ok
@app.route('/creaTipoBolla', methods = ['POST'])
@jwt_required()
def creaTipoBolla():
    descrizione = request.json['descrizione']
    visibile = request.json['visibile']
    tipoBolla = TipoBolla(descrizione, visibile)
    db.session.add(tipoBolla)
    db.session.commit()
    return format_tipo_bolla(tipoBolla)

# get all tipo bolla ok
@app.route('/tipoBolle', methods = ['GET'])
@jwt_required()
def get_all_tipoBolle():
    tipoBolle = TipoBolla.query.order_by(TipoBolla.idtipobolla.desc()).all()
    tipoBolla_list = []
    for tipoBolla in tipoBolle:
        tipoBolla_list.append(format_tipo_bolla(tipoBolla))
    return{'tipoBolle':tipoBolla_list}

# get single tipo bolla ok
@app.route('/tipoBolle/<idtipobolla>', methods = ['GET'])
@jwt_required()
def get_tipoBolle(idtipobolla):
    try:
        tipoBolla = TipoBolla.query.filter_by(idtipobolla=idtipobolla).one()
        if not tipoBolla:
            raise Exception('tipo bolla non trovata')
        formatted_tipoBolla = format_tipo_bolla(tipoBolla)
        return {'tipoBolla':formatted_tipoBolla}
    except Exception as e:
        return {'errore': str(e)}

# delete tipo bolla ok
@app.route('/tipoBolle/<idtipobolla>', methods=['DELETE'])
@jwt_required()
def delete_tipoBolla(idtipobolla):
    tipoBolla = TipoBolla.query.filter_by(idtipobolla=idtipobolla).one()
    db.session.delete(tipoBolla)
    db.session.commit()
    return f'tipoBolla (id: {idtipobolla}) deleted!'

# update tipo bolla ok
@app.route('/tipoBolle/<idtipobolla>',methods=['PUT'])
@jwt_required()
def update_tipo_bolla(idtipobolla):
    tipoBolla = TipoBolla.query.filter_by(idtipobolla=idtipobolla).first()
    
    if tipoBolla:
        tipoBolla.descrizione = request.json.get('descrizione', tipoBolla.descrizione)
        tipoBolla.visibile = request.json.get('visibile', tipoBolla.visibile)
        db.session.commit()
        
        return {'azienda': format_tipo_bolla(tipoBolla)}
    else:
        return {'error': 'tipo Bolla non trovata'}, 404


#  ----------------------------------------------------------
# tipo pagamento
#  ----------------------------------------------------------

# create tipopagamento ok
@app.route('/creaTipoPagamento', methods = ['POST'])
@jwt_required()
def creaTipoPagamento():
    descrizione = request.json['descrizione']
    ggrata1 = request.json['ggrata1']
    fmrata1 = request.json['fmrata1']
    percrata1 = request.json['percrata1']
    ggrata2 = request.json['ggrata2']
    fmrata2 = request.json['fmrata2']
    percrata2 = request.json['percrata2']
    ggrata3 = request.json['ggrata3']
    fmrata3 = request.json['fmrata3']
    percrata3 = request.json['percrata3']
    codDeposito = request.json['codDeposito']
    visibile = request.json['visibile']
    codtipodeposito = request.json['codtipodeposito']
    tipoPagamento = TipoPagamento( descrizione, ggrata1, fmrata1, percrata1,ggrata2, fmrata2, percrata2, ggrata3, fmrata3, percrata3, codDeposito,visibile,codtipodeposito)
    db.session.add(tipoPagamento)
    db.session.commit()
    return format_tipo_pagamento(tipoPagamento)

# get all tipoPagamento ok
@app.route('/tipoPagamento', methods = ['GET'])
@jwt_required()
def get_all_tipoPagamento():
    tipoPagamenti = TipoPagamento.query.order_by(TipoPagamento.descrizione.desc()).all()
    tipoPagamento_list = []
    for tipoPagamento in tipoPagamenti:
        tipoPagamento_list.append(format_tipo_pagamento(tipoPagamento))
    return {'tipoPagamento':tipoPagamento_list}

# get single tipoPagamento ok
@app.route('/tipoPagamento/<idtipopagamento>', methods = ['GET'])
@jwt_required()
def get_tipoPagamento(idtipopagamento):
    try:
        tipoPagamento = TipoPagamento.query.filter_by(idtipopagamento=idtipopagamento).first()
        if not tipoPagamento:
            raise Exception('tipo Pagamento non trovato')
        formatted_tipoPagamento = format_tipo_pagamento(tipoPagamento)
        return {'tipoPagamento ':formatted_tipoPagamento}
    except Exception as e:
        return {'errore': str(e)}
    
# delete tipoPagamento ok
@app.route('/tipoPagamento/<idtipopagamento>', methods=['DELETE'])
@jwt_required()
def delete_tipoPagamento(idtipopagamento):
    tipoPagamento = TipoPagamento.query.filter_by(idtipopagamento=idtipopagamento).one()
    db.session.delete(tipoPagamento)
    db.session.commit()
    return f'tipoPagamento (id: {idtipopagamento}) deleted!'

# update tipoPagamento ok
@app.route('/tipoPagamento/<idtipopagamento>',methods=['PUT'])
@jwt_required()
def update_tipoPagamento(idtipopagamento):
    tipoPagamento = TipoPagamento.query.filter_by(idtipopagamento=idtipopagamento).first()
    
    if tipoPagamento:
        tipoPagamento.descrizione = request.json.get('descrizione', tipoPagamento.descrizione)
        tipoPagamento.ggrata1 = request.json.get('ggrata1', tipoPagamento.ggrata1)
        tipoPagamento.fmrata1 = request.json.get('fmrata1', tipoPagamento.fmrata1)
        tipoPagamento.percrata1 = request.json.get('percrata1', tipoPagamento.percrata1)
        tipoPagamento.ggrata2 = request.json.get('ggrata2', tipoPagamento.ggrata2)
        tipoPagamento.fmrata2 = request.json.get('fmrata2', tipoPagamento.fmrata2)
        tipoPagamento.percrata2 = request.json.get('percrata2', tipoPagamento.percrata2)
        tipoPagamento.ggrata3 = request.json.get('ggrata3', tipoPagamento.ggrata3)
        tipoPagamento.percrata3 = request.json.get('percrata3', tipoPagamento.percrata3)
        tipoPagamento.codDeposito = request.json.get('codDeposito', tipoPagamento.codDeposito)
        tipoPagamento.visibile = request.json.get('visibile', tipoPagamento.visibile)
        tipoPagamento.codtipodeposito = request.json.get('codtipodeposito', tipoPagamento.codtipodeposito)

        db.session.commit()
        
        return {'tipoPagamento': format_tipo_pagamento(tipoPagamento)}
    else:
        return {'error': 'pagina tipo Pagamento non trovata'}, 404
    
#  ----------------------------------------------------------
# trasporti
#  ----------------------------------------------------------

#create trasporto ok
    
@app.route('/creaTrasporto',methods=['POST'])
@jwt_required()
def create_trasporto():
    dataTrasporto= request.json['dataTrasporto']
    codAnagrafica= request.json['codAnagrafica']
    codLocalitaPartenza= request.json['codLocalitaPartenza']
    codLocalitaArrivo= request.json['codLocalitaArrivo']
    codDescrizioneTrasporto= request.json['codDescrizioneTrasporto']
    imponibile= request.json['imponibile']
    codIva= request.json['codIva']
    totale= request.json['totale']
    codTipoBolla= request.json['codTipoBolla']
    numero= request.json['numero']
    note= request.json['note']
    codDocumento= request.json['codDocumento']
    dataAnticipato= request.json['dataAnticipato']
    codModalitaAnticipato= request.json['codModalitaAnticipato']
    importoAnticipato= request.json['importoAnticipato']
    dettagliAnticipato= request.json['dettagliAnticipato']
    codDepositoAnticipato= request.json['codDepositoAnticipato']

    trasporto = Trasporti(dataTrasporto, codAnagrafica, codLocalitaPartenza,
                codLocalitaArrivo,codDescrizioneTrasporto,imponibile,
                codIva,totale,codTipoBolla,numero,note,codDocumento,
                dataAnticipato,importoAnticipato,codModalitaAnticipato,dettagliAnticipato,codDepositoAnticipato)
    
    db.session.add(trasporto)
    db.session.commit()
    return format_trasporti(trasporto)

    
    #get all trasporto

@app.route('/trasportiList',methods=['GET'])
@jwt_required()
def get_all_trasporti():
    trasporti= Trasporti.query.order_by(Trasporti.idTrasporti.desc()).all()
    trasportiList=[]
    for trasporto in trasporti:
        trasportiList.append(format_trasporti(trasporto))
    print("************trasportiList",trasportiList)
    return {'trasportiList ':trasportiList}

#    get single Trasporto

@app.route('/trasporti/<idTrasporti>', methods=['Get'])
@jwt_required()
def get_trasporto(dataTrasporto):
    # def get_trasporto(idTrasporti):
      try:
        trasporto = Trasporti.query.filter_by(dataTrasporto= dataTrasporto).first()
        # trasporto = Trasporti.query.filter_by(idTrasporti= idTrasporti).first()
        if not trasporto:
            raise Exception('tipo trasporto non trovato')
        formatted_trasporti = format_trasporti(trasporto)
        return {'trasporto': formatted_trasporti}
      except Exception as e:
        return {'errore': str(e)}
    
# delete trasporto ok
      
@app.route('/trasporti/<idTrasporti>', methods=['DELETE'])
@jwt_required()
def delete_trasporto(idTrasporti):
    trasporto = Trasporti.query.filter_by(idTrasporti= idTrasporti).one()
    db.session.delete(trasporto)
    db.session.commit()
    return f'Trsporto (id: {idTrasporti}) deleted!'

#update trasporto ok

@app.route('/trasporti/<idTrasporti>',methods=['PUT'])
@jwt_required()
def update_trasporti(idTrasporti):
    trasporto = Trasporti.query.filter_by(idTrasporti= idTrasporti).first()
    if trasporto:
        trasporto.dataTrasporto= request.json.get('dataTrasporto',trasporto.dataTrasporto)
        trasporto.codAnagrafica= request.json.get('codAnagrafica',trasporto.codAnagrafica)
        trasporto.codLocalitaPartenza= request.json.get('codLocalitaPartenza',trasporto.codLocalitaPartenza)
        trasporto.codLocalitaArrivo= request.json.get('codLocalitaArrivo',trasporto.codLocalitaArrivo)
        trasporto.codDescrizioneTrasporto= request.json.get('codDescrizioneTrasporto',trasporto.codDescrizioneTrasporto)
        trasporto.imponibile= request.json.get('imponibile',trasporto.imponibile)
        trasporto.codIva= request.json.get('codIva',trasporto.codIva)
        trasporto.totale= request.json.get('totale',trasporto.totale)
        trasporto.codTipoBolla= request.json.get('codTipoBolla',trasporto.codTipoBolla)
        trasporto.numero= request.json.get('numero',trasporto.numero)
        trasporto.note= request.json.get('note',trasporto.note)
        trasporto.codDocumento= request.json.get('codDocumento',trasporto.codDocumento)
        trasporto.dataAnticipato= request.json.get('dataAnticipato',trasporto.dataAnticipato)
        trasporto.codModalitaAnticipato= request.json.get('codModalitaAnticipato',trasporto.codModalitaAnticipato)
        trasporto.importoAnticipato= request.json.get('importoAnticipato',trasporto.importoAnticipato)
        trasporto.dettagliAnticipato= request.json.get('dettagliAnticipato',trasporto.dettagliAnticipato)
        trasporto.codDepositoAnticipato= request.json.get('codDepositoAnticipato',trasporto.codDepositoAnticipato)
        # trasporto.update(dict(trasporti_created_at = datetime.utcnow()))

        db.session.commit()
        return{'trasporti':format_trasporti(trasporto)}
    else:
        return {'error': 'Trasporto non trovato'}, 404

    
if __name__ == '__main__':
    app.run()

with app.app_context():
    db.create_all()