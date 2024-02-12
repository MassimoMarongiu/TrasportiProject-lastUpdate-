from exts import db
from datetime import datetime

class Anagrafica(db.Model):
    idanagrafica = db.Column(db.Integer, primary_key=True)
    ragionesociale = db.Column(db.String(255), nullable=True)
    partitaiva = db.Column(db.String(50), nullable=True)
    codicefiscale = db.Column(db.String(50), nullable=True)
    localita = db.Column(db.String(255), nullable=True)
    indirizzo = db.Column(db.String(255), nullable=True)
    prov = db.Column(db.String(2), nullable=True)
    cap = db.Column(db.String(5), nullable=True)
    telefono1 = db.Column(db.String(50), nullable=True)
    telefono2 = db.Column(db.String(50), nullable=True)
    fax = db.Column(db.String(50), nullable=True)
    email = db.Column(db.String(50), nullable=True)
    attivo = db.Column(db.Boolean, nullable=True)
    estero = db.Column(db.String(255), nullable=True)
    nazionale = db.Column(db.Boolean, nullable=True)
    codtipopagamento = db.Column(db.Integer, nullable=True)
    CodCategoriaSconto = db.Column(db.Integer, nullable=True)
    cli_for = db.Column(db.Integer, nullable=True)
    vettore = db.Column(db.Boolean, nullable=True)
    tipo_cliente = db.Column(db.Integer, nullable=True)
    scontopredlistino = db.Column(db.String(50), nullable=True)
    anagrafica_created_at = db.Column(db.DateTime, nullable =False, default = datetime.utcnow)
    
    def __repr__(self):
        return f"Anagrafica(idanagrafica={self.idanagrafica}, ragionesociale={self.ragionesociale}, partitaiva={self.partitaiva},codicefiscale={self.codicefiscale}, codLocalitaPartenza={self.codLocalitaPartenza},localita={self.localita}, indirizzo={self.indirizzo},prov={self.prov},cap={self.cap},telefono1={self.telefono1},telefono2={self.telefono2},fax={self.fax},email={self.email},attivo={self.attivo},estero={self.estero},nazionale={self.nazionale},codtipopagamento={self.codtipopagamento},CodCategoriaSconto={self.CodCategoriaSconto},cli_for={self.cli_for},vettore={self.vettore},tipo_cliente={self.tipo_cliente},scontopredlistino={self.scontopredlistino},anagrafica_created_at={self.anagrafica_created_at})"
    
    def __init__(self,ragionesociale, partitaiva, codicefiscale,
                 localita,indirizzo,prov,cap,
                 telefono1,telefono2,fax,email,attivo,
                 estero,nazionale,CodCategoriaSconto,codtipopagamento,
                 cli_for,vettore,tipo_cliente,scontopredlistino):
        self.ragionesociale= ragionesociale
        self.partitaiva=partitaiva
        self.codicefiscale=codicefiscale
        self.localita=localita
        self.indirizzo=indirizzo
        self.prov=prov
        self.cap=cap
        self.telefono1=telefono1
        self.telefono2=telefono2
        self.fax=fax
        self.email=email
        self.attivo=attivo
        self.estero=estero
        self.nazionale=nazionale
        self.codtipopagamento=codtipopagamento
        self.CodCategoriaSconto=CodCategoriaSconto
        self.cli_for=cli_for
        self.vettore=vettore
        self.tipo_cliente=tipo_cliente
        self.scontopredlistino=scontopredlistino

def format_Anagrafica(anagrafica):
    return{
        "idanagrafica":anagrafica.idanagrafica,
        "ragionesociale":anagrafica.ragionesociale,
        "partitaiva":anagrafica.partitaiva,
        "codicefiscale":anagrafica.codicefiscale,
        "localita":anagrafica.localita,
        "indirizzo":anagrafica.indirizzo,
        "prov":anagrafica.prov,
        "cap":anagrafica.cap,
        "telefono1":anagrafica.telefono1,
        "telefono2":anagrafica.telefono2,
        "fax":anagrafica.fax,
        "email":anagrafica.email,
        "attivo":anagrafica.attivo,
        "estero":anagrafica.estero,
        "nazionale":anagrafica.nazionale,
        "codtipopagamento":anagrafica.codtipopagamento,
        "CodCategoriaSconto":anagrafica.CodCategoriaSconto,
        "cli_for":anagrafica.cli_for,
        "vettore":anagrafica.vettore,
        "tipo_cliente":anagrafica.tipo_cliente,
        "scontopredlistino":anagrafica.scontopredlistino,
        "anagrafica_created_at":anagrafica.anagrafica_created_at
    }
    
class Depositi(db.Model):
    IdDeposito = db.Column(db.Integer, primary_key=True,autoincrement=True)
    Descrizione = db.Column(db.String(255), nullable=True)
    CoordinateIBAN = db.Column(db.String(50), nullable=True)
    codtipodeposito = db.Column(db.Integer, nullable=True)
    codazienda = db.Column(db.Integer, nullable=True)
    predef = db.Column(db.Integer, nullable=True)
    deposito_created_at = db.Column(db.DateTime, nullable =False, default = datetime.utcnow)
    
    def __repr__(self):
        return f"Depositi(id={self.IdDeposito}, Descrizione={self.Descrizione},CoordinateIBAN={self.CoordinateIBAN},codtipodeposito={self.codtipodeposito},codazienda={self.codazienda}, predef={self.predef},deposito_created_at={self.deposito_created_at})"
    
    def __init__(self,Descrizione, CoordinateIBAN, codtipodeposito,
                 codazienda,predef):
        self.Descrizione= Descrizione
        self.CoordinateIBAN=CoordinateIBAN
        self.codtipodeposito=codtipodeposito
        self.codazienda=codazienda
        self.predef=predef

def format_depositi(deposito):
    return{
        "IdDeposito":deposito.IdDeposito,
        "Descrizione":deposito.Descrizione,
        "CoordinateIBAN":deposito.CoordinateIBAN,
        "codtipodeposito":deposito.codtipodeposito,
        "codazienda":deposito.codazienda,
        "predef":deposito.predef,
        "deposito_created_at":deposito.deposito_created_at
    }
    
class DescrizioneTrasporto(db.Model):
    iddescrizione = db.Column(db.Integer, primary_key=True)
    descrizione = db.Column(db.String(255), nullable=True)
    visibile = db.Column(db.Integer, nullable=True)
    descrizione_created_at = db.Column(db.DateTime, nullable =False, default = datetime.utcnow)
    
    def __repr__(self):
        return f"Descrizione Trasporto(id={self.iddescrizione}, descrizione={self.descrizione},visibile={self.visibile})"
    
    def __init__(self,descrizione, visibile):
        self.descrizione= descrizione
        self.visibile=visibile
        
def format__descrizione_trasporti(descrizioneTrasporto):
    return{
        "iddescrizione":descrizioneTrasporto.iddescrizione,
        "descrizione":descrizioneTrasporto.descrizione,
        "visibile":descrizioneTrasporto.visibile,
        "descrizione_created_at":descrizioneTrasporto.descrizione_created_at
    }
   
class Documenti(db.Model):
    idDocumento = db.Column(db.Integer, primary_key=True)
    CodTipoDocumento = db.Column(db.Integer, nullable=True)
    Numero = db.Column(db.Integer, nullable=True)
    DataDocumento = db.Column(db.DateTime, nullable=True)
    CodAgente = db.Column(db.Integer, nullable=True)
    CodIntestatario = db.Column(db.Integer, nullable=True)
    intestatario_ragionesociale = db.Column(db.String(255), nullable=True)
    intestatario_partitaiva = db.Column(db.String(50), nullable=True)
    intestatario_codicefiscale = db.Column(db.String(50), nullable=True)
    intestatario_localita = db.Column(db.String(255), nullable=True)
    intestatario_prov = db.Column(db.String(2), nullable=True)
    intestatario_indirizzo = db.Column(db.String(255), nullable=True)
    intestatario_cap = db.Column(db.String(5), nullable=True)
    DataAccettazione = db.Column(db.DateTime, nullable=True)
    PreAttivo = db.Column(db.Boolean, nullable=True)
    DDT_Destinazione = db.Column(db.String(255), nullable=True)
    ddt_indirizzo = db.Column(db.String(255), nullable=True)
    ddt_localita = db.Column(db.String(255), nullable=True)
    ddt_cap = db.Column(db.String(5), nullable=True)
    ddt_prov = db.Column(db.String(2), nullable=True)
    CodModPagamento = db.Column(db.Integer, nullable=True)
    DDT_Vettore = db.Column(db.String(300), nullable=True)
    DDT_TrasportoMezzo = db.Column(db.String(50), nullable=True)
    DDT_AspettoBeni = db.Column(db.String(50), nullable=True)
    DDT_NumeroColli = db.Column(db.Integer, nullable=True)
    DDT_DataOraInizio = db.Column(db.DateTime, nullable=True)
    DDT_DataOraRitiro = db.Column(db.DateTime, nullable=True)
    DDT_Porto = db.Column(db.String(50), nullable=True)
    DDT_CausaleTrasporto = db.Column(db.String(255), nullable=True)
    accompagnatoria = db.Column(db.Boolean, nullable=True)
    codddt = db.Column(db.Integer, nullable=True)
    RifDDT = db.Column(db.Integer, nullable=True)
    Attivo = db.Column(db.Integer, nullable=True)
    Imponibile = db.Column(db.Float, nullable=True)
    IVA = db.Column(db.Float, nullable=True)
    Totale = db.Column(db.Float, nullable=True)
    Tipologia = db.Column(db.String(255), nullable=True)
    QuantitaPeso = db.Column(db.String(255), nullable=True)
    LuogoCarico = db.Column(db.String(255), nullable=True)
    LuogoScarico = db.Column(db.String(255), nullable=True)
    documenti_created_at = db.Column(db.DateTime, nullable =False, default = datetime.utcnow)
    
    def __repr__(self):
        return f"Documenti(idDocumento={self.idDocumento}, CodTipoDocumento={self.CodTipoDocumento}, Numero={self.Numero},DataDocumento={self.DataDocumento}, CodAgente={self.CodAgente},CodIntestatario={self.CodIntestatario}, intestatario_ragionesociale={self.intestatario_ragionesociale},intestatario_partitaiva={self.intestatario_partitaiva},intestatario_codicefiscale={self.intestatario_codicefiscale},intestatario_localita={self.intestatario_localita},intestatario_prov={self.intestatario_prov},intestatario_indirizzo={self.intestatario_indirizzo},intestatario_cap={self.intestatario_cap},DataAccettazione={self.DataAccettazione},PreAttivo={self.PreAttivo},DDT_Destinazione={self.DDT_Destinazione},ddt_indirizzo={self.ddt_indirizzo},ddt_localita={self.ddt_localita},ddt_cap={self.ddt_cap},ddt_prov={self.ddt_prov},CodModPagamento={self.CodModPagamento},DDT_Vettore={self.DDT_Vettore},DDT_TrasportoMezzo={self.DDT_TrasportoMezzo},DDT_AspettoBeni={self.DDT_AspettoBeni},DDT_NumeroColli={self.DDT_NumeroColli},DDT_DataOraInizio={self.DDT_DataOraInizio},DDT_DataOraRitiro={self.DDT_DataOraRitiro},DDT_Porto={self.DDT_Porto},DDT_CausaleTrasporto={self.DDT_CausaleTrasporto}, accompagnatoria={self.accompagnatoria},codddt={self.codddt},RifDDT={self.RifDDT},Attivo={self.Attivo},Imponibile={self.Imponibile},IVA={self.IVA},Totale={self.Totale},Tipologia={self.Tipologia},QuantitaPeso={self.QuantitaPeso},LuogoCarico={self.LuogoCarico},LuogoScarico={self.LuogoScarico},documenti_created_at={self.documenti_created_at})"
    
    def __init__(self,CodTipoDocumento, Numero, DataDocumento,
                 CodAgente,CodIntestatario,intestatario_ragionesociale,intestatario_partitaiva,intestatario_codicefiscale,
                 intestatario_localita,intestatario_prov,intestatario_indirizzo,intestatario_cap,
                 DataAccettazione,PreAttivo,
                 DDT_Destinazione,ddt_indirizzo,ddt_localita,
                 ddt_cap,ddt_prov,
                 CodModPagamento,DDT_Vettore,
                 DDT_TrasportoMezzo,
                 DDT_AspettoBeni,
                 DDT_NumeroColli,
                 DDT_DataOraInizio,
                 DDT_DataOraRitiro,
                 DDT_Porto,
                 DDT_CausaleTrasporto,
                 accompagnatoria,
                 codddt,
                 RifDDT,
                 Attivo,
                 Imponibile,
                 IVA,
                 Totale,
                 Tipologia,
                 QuantitaPeso,
                 LuogoCarico,
                 LuogoScarico
                 ):
        self.CodTipoDocumento= CodTipoDocumento
        self.Numero=Numero
        self.DataDocumento=DataDocumento
        self.CodAgente=CodAgente
        self.CodIntestatario=CodIntestatario
        self.intestatario_ragionesociale=intestatario_ragionesociale
        self.intestatario_partitaiva=intestatario_partitaiva
        self.intestatario_codicefiscale=intestatario_codicefiscale
        self.intestatario_localita=intestatario_localita
        self.intestatario_prov=intestatario_prov
        self.intestatario_indirizzo=intestatario_indirizzo
        self.intestatario_cap=intestatario_cap
        self.DataAccettazione=DataAccettazione
        self.PreAttivo=PreAttivo
        self.DDT_Destinazione=DDT_Destinazione
        self.ddt_indirizzo=ddt_indirizzo
        self.ddt_localita=ddt_localita
        self.ddt_cap=ddt_cap
        self.ddt_prov=ddt_prov
        self.CodModPagamento=CodModPagamento
        self.DDT_Vettore=DDT_Vettore
        self.DDT_TrasportoMezzo=DDT_TrasportoMezzo
        self.DDT_AspettoBeni=DDT_AspettoBeni
        self.DDT_NumeroColli=DDT_NumeroColli
        self.DDT_DataOraInizio=DDT_DataOraInizio
        self.DDT_DataOraRitiro=DDT_DataOraRitiro
        self.DDT_Porto=DDT_Porto
        self.DDT_CausaleTrasporto=DDT_CausaleTrasporto
        self.accompagnatoria=accompagnatoria
        self.codddt=codddt
        self.RifDDT=RifDDT
        self.Attivo=Attivo
        self.Imponibile=Imponibile
        self.IVA=IVA
        self.Totale=Totale
        self.Tipologia=Tipologia
        self.QuantitaPeso=QuantitaPeso
        self.LuogoCarico=LuogoCarico
        self.LuogoScarico=LuogoScarico

def format_documenti(documenti):
    return{
        "idDocumento":documenti.idDocumento,
        "CodTipoDocumento":documenti.CodTipoDocumento,
        "Numero":documenti.Numero,
        "DataDocumento":documenti.DataDocumento,
        "CodAgente":documenti.CodAgente,
        "CodIntestatario":documenti.CodIntestatario,
        "intestatario_ragionesociale":documenti.intestatario_ragionesociale,
        "intestatario_partitaiva":documenti.intestatario_partitaiva,
        "intestatario_codicefiscale":documenti.intestatario_codicefiscale,
        "intestatario_localita":documenti.intestatario_localita,
        "intestatario_prov":documenti.intestatario_prov,
        "intestatario_indirizzo":documenti.intestatario_indirizzo,
        "intestatario_cap":documenti.intestatario_cap,
        "DataAccettazione":documenti.DataAccettazione,
        "PreAttivo":documenti.PreAttivo,
        "DDT_Destinazione":documenti.DDT_Destinazione,
        "ddt_indirizzo":documenti.ddt_indirizzo,
        "ddt_localita":documenti.ddt_localita,
        "ddt_cap":documenti.ddt_cap,
        "ddt_prov":documenti.ddt_prov,
        "CodModPagamento":documenti.CodModPagamento,
        "DDT_Vettore":documenti.DDT_Vettore,
        "DDT_TrasportoMezzo":documenti.DDT_TrasportoMezzo,
        "DDT_AspettoBeni":documenti.DDT_AspettoBeni,
        "DDT_NumeroColli":documenti.DDT_NumeroColli,
        "DDT_DataOraInizio":documenti.DDT_DataOraInizio,
        "DDT_DataOraRitiro":documenti.DDT_DataOraRitiro,
        "DDT_Porto":documenti.DDT_Porto,
        "DDT_CausaleTrasporto":documenti.DDT_CausaleTrasporto,
        "accompagnatoria":documenti.accompagnatoria,
        "codddt":documenti.codddt,
        "RifDDT":documenti.RifDDT,
        "Attivo":documenti.Attivo,
        "Imponibile":documenti.Imponibile,
        "IVA":documenti.IVA,
        "Totale":documenti.Totale,
        "Tipologia":documenti.Tipologia,
        "QuantitaPeso":documenti.QuantitaPeso,
        "LuogoCarico":documenti.LuogoCarico,
        "LuogoScarico":documenti.LuogoScarico,
        "documenti_created_at":documenti.documenti_created_at
    }

class LocalitaTrasporti(db.Model):
    idlocalita = db.Column(db.Integer, primary_key=True)
    descrizione = db.Column(db.String(255), nullable=True)
    provincia = db.Column(db.String(50), nullable=True)
    cap = db.Column(db.String(50), nullable=True)
    visibile = db.Column(db.Integer, nullable=True)
    arrivo = db.Column(db.Integer, nullable=True)
    localita_trasporto_created_at = db.Column(db.DateTime, nullable =False, default = datetime.utcnow)
    
    def __repr__(self):
        return f"Localita Trasporti(id={self.idlocalita}, descrizione={self.descrizione},provincia={self.provincia},cap={self.cap},visibile={self.visibile}, arrivo={self.arrivo}),localita_trasporto_created_at={self.localita_trasporto_created_at})"
    
    def __init__(self,descrizione, provincia, cap,
                 visibile,arrivo):
        self.descrizione= descrizione
        self.provincia=provincia
        self.cap=cap
        self.visibile=visibile
        self.arrivo=arrivo

def format_localita_trasporti(trasporto):
    return{
        "idlocalita":trasporto.idlocalita,
        "descrizione":trasporto.descrizione,
        "provincia":trasporto.provincia,
        "cap":trasporto.cap,
        "visibile":trasporto.visibile,
        "arrivo":trasporto.arrivo,
        "localita_trasporto_created_at":trasporto.localita_trasporto_created_at

        
    }

class TipoBolla(db.Model):
    idtipobolla = db.Column(db.Integer, primary_key=True)
    descrizione = db.Column(db.String(50), nullable=True)
    visibile = db.Column(db.Integer, nullable=True)
    tipo_bolla_created_at = db.Column(db.DateTime, nullable =False, default = datetime.utcnow)
    
    def __repr__(self):
        return f"Tipo Bolla(id={self.idtipobolla}, descrizione={self.descrizione},visibile={self.visibile},tipo_bolla_created_at={self.tipo_bolla_created_at})"

        db.session.commit()
    def __init__(self,descrizione, visibile):
        self.descrizione= descrizione
        self.visibile=visibile

def format_tipo_bolla(tipoBolla):
    return{
        "idtipobolla":tipoBolla.idtipobolla,
        "descrizione":tipoBolla.descrizione,
        "visibile":tipoBolla.visibile,
        "tipo_bolla_created_at":tipoBolla.tipo_bolla_created_at
    }

class TipoPagamento(db.Model):
    idtipopagamento = db.Column(db.Integer, primary_key=True)
    descrizione = db.Column(db.String(255), nullable=True)
    ggrata1 = db.Column(db.Integer, nullable=True)
    fmrata1 = db.Column(db.Integer, nullable=True)
    percrata1 = db.Column(db.Integer, nullable=True)
    ggrata2 = db.Column(db.Integer, nullable=True)
    fmrata2 = db.Column(db.Integer, nullable=True)
    percrata2 = db.Column(db.Integer, nullable=True)
    ggrata3 = db.Column(db.Integer, nullable=True)
    fmrata3 = db.Column(db.Integer, nullable=True)
    percrata3 = db.Column(db.Integer, nullable=True)
    codDeposito = db.Column(db.Integer, nullable=True)
    visibile = db.Column(db.Integer, nullable=True)
    codtipodeposito = db.Column(db.Integer, nullable=True)
    tipo_pagamento_created_at = db.Column(db.DateTime, nullable =False, default = datetime.utcnow)
    
    def __repr__(self):
        return f"Tipo Pagamento(id={self.idtipopagamento}, descrizione={self.descrizione},ggrata1={self.ggrata1},fmrata1={self.fmrata1},percrata1={self.percrata1}, ggrata2=={self.ggrata2},fmrata2={self.fmrata2},percrata2={self.percrata2},percrata2={self.percrata2},ggrata3={self.ggrata3},fmrata3={self.fmrata3},percrata3={self.percrata3},codDeposito={self.codDeposito},visibile={self.visibile},codtipodeposito={self.codtipodeposito},tipo_pagamento_created_at={self.tipo_pagamento_created_at})"
    
    def __init__(self,descrizione, ggrata1, fmrata1,
                 percrata1,ggrata2,fmrata2,
                 percrata2,ggrata3,fmrata3,percrata3,codDeposito,
                 visibile,codtipodeposito):
        self.descrizione= descrizione
        self.ggrata1=ggrata1
        self.fmrata1=fmrata1
        self.percrata1=percrata1
        self.ggrata2=ggrata2
        self.fmrata2=fmrata2
        self.percrata2=percrata2
        self.ggrata3=ggrata3
        self.fmrata3=fmrata3
        self.percrata3=percrata3
        self.codDeposito=codDeposito
        self.visibile=visibile
        self.codtipodeposito=codtipodeposito

def format_tipo_pagamento(tipoPagamento):
    return{
        "idtipopagamento":tipoPagamento.idtipopagamento,
        "descrizione":tipoPagamento.descrizione,
        "ggrata1":tipoPagamento.ggrata1,
        "fmrata1":tipoPagamento.fmrata1,
        "percrata1":tipoPagamento.percrata1,
        "ggrata2":tipoPagamento.ggrata2,
        "fmrata2":tipoPagamento.fmrata2,
        "percrata2":tipoPagamento.percrata2,
        "ggrata3":tipoPagamento.ggrata3,
        "fmrata3":tipoPagamento.fmrata3,
        "percrata3":tipoPagamento.percrata3,
        "codDeposito":tipoPagamento.codDeposito,
        "visibile":tipoPagamento.visibile,
        "codtipodeposito":tipoPagamento.codtipodeposito,
        "tipo_pagamento_created_at":tipoPagamento.tipo_pagamento_created_at
    }

class Trasporti(db.Model):
    idTrasporti = db.Column(db.Integer, primary_key=True)
    dataTrasporto = db.Column(db.DateTime, nullable=True)
    codAnagrafica = db.Column(db.Integer, nullable=True)
    codLocalitaPartenza = db.Column(db.Integer, nullable=True)
    codLocalitaArrivo = db.Column(db.Integer, nullable=True)
    codDescrizioneTrasporto = db.Column(db.Integer, nullable=True)
    imponibile = db.Column(db.Float, nullable=True)
    codIva = db.Column(db.Integer, nullable=True)
    totale = db.Column(db.Float, nullable=True)
    codTipoBolla = db.Column(db.Integer, nullable=True)
    numero = db.Column(db.String(50), nullable=True)
    note = db.Column(db.String(500), nullable=True)
    codDocumento = db.Column(db.Integer, nullable=True)
    dataAnticipato = db.Column(db.DateTime, nullable=True)
    codModalitaAnticipato = db.Column(db.Integer, nullable=True)
    importoAnticipato = db.Column(db.Float, nullable=True)
    dettagliAnticipato = db.Column(db.String(255), nullable=True)
    codDepositoAnticipato = db.Column(db.Integer, nullable=True)
    trasporti_created_at = db.Column(db.DateTime, nullable =False, default = datetime.utcnow)
    
    def __repr__(self):
        return f"Trasporti(id={self.idTrasporti}, dataTrasporto={self.dataTrasporto}, codAnagrafica={self.codAnagrafica}, codLocalitaPartenza={self.codLocalitaPartenza}, codLocalitaArrivo={self.codLocalitaArrivo}, codDescrizioneTrasporto={self.codDescrizioneTrasporto}, imponibile={self.imponibile}, codIva={self.codIva}, totale={self.totale}, codTipoBolla={self.codTipoBolla}, numero={self.numero}, note={self.note}, codDocumento={self.codDocumento}, dataAnticipato={self.dataAnticipato}, codModalitaAnticipato={self.codModalitaAnticipato}, importoAnticipato={self.importoAnticipato}, dettagliAnticipato={self.dettagliAnticipato}, codDepositoAnticipato={self.codDepositoAnticipato}, trasporti_created_at={self.trasporti_created_at})"

    def __init__(self,dataTrasporto, codAnagrafica, codLocalitaPartenza,
                 codLocalitaArrivo,codDescrizioneTrasporto,imponibile,
                 codIva,totale,codTipoBolla,numero,note,codDocumento,
                 dataAnticipato,codModalitaAnticipato,importoAnticipato,
                 dettagliAnticipato,codDepositoAnticipato):
        self.dataTrasporto= dataTrasporto
        self.codAnagrafica=codAnagrafica
        self.codLocalitaPartenza=codLocalitaPartenza
        self.codLocalitaArrivo=codLocalitaArrivo
        self.codDescrizioneTrasporto=codDescrizioneTrasporto
        self.imponibile=imponibile
        self.codIva=codIva
        self.totale=totale
        self.codTipoBolla=codTipoBolla
        self.numero=numero
        self.note=note
        self.codDocumento=codDocumento
        self.dataAnticipato=dataAnticipato
        self.codModalitaAnticipato=codModalitaAnticipato
        self.importoAnticipato=importoAnticipato
        self.dettagliAnticipato=dettagliAnticipato
        self.codDepositoAnticipato=codDepositoAnticipato

def format_trasporti(trasporti):
    return{
        "idTrasporti":trasporti.idTrasporti,
        "dataTrasporto":trasporti.dataTrasporto,
        "codAnagrafica":trasporti.codAnagrafica,
        "codLocalitaPartenza":trasporti.codLocalitaPartenza,
        "codLocalitaArrivo":trasporti.codLocalitaArrivo,
        "codDescrizioneTrasporto":trasporti.codDescrizioneTrasporto,
        "imponibile":trasporti.imponibile,
        "codIva":trasporti.codIva,
        "totale":trasporti.totale,
        "codTipoBolla":trasporti.codTipoBolla,
        "numero":trasporti.numero,
        "note":trasporti.note,
        "codDocumento":trasporti.codDocumento,
        "dataAnticipato":trasporti.dataAnticipato,
        "codModalitaAnticipato":trasporti.codModalitaAnticipato,
        "importoAnticipato":trasporti.importoAnticipato,
        "dettagliAnticipato":trasporti.dettagliAnticipato,
        "codDepositoAnticipato":trasporti.codDepositoAnticipato,
        "trasporto_created_at":trasporti.trasporti_created_at
    }


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), nullable=False, unique=True)
    email = db.Column(db.String(80), nullable=False)
    password = db.Column(db.Text(), nullable=False)
    user_created_at = db.Column(db.DateTime, nullable =False, default = datetime.utcnow)
    # log_time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # __table_args__ = (
    #     CheckConstraint("LENGTH(username) BETWEEN 12 AND 16"),
    #     CheckConstraint("LENGTH(password) BETWEEN 12 AND 16"),
    # )
    
    def __repr__(self):
        return f"<User {self.username}>"

    def save(self):
        db.session.add(self)
        db.session.commit()

#     def __repr__(self):
#         return f"User: {self.username} email:{self.email} Password : {self.password}"

    def __init__(self,username,email,password):
        self.username = username
        self.email = email
        self.password = password

def format_login(user):
    return {
        "idLogin": user.idLogin,
        "username": user.username,
        "email": user.email,
        "password": user.password,
        "user_created_at": user.user_created_at
    }