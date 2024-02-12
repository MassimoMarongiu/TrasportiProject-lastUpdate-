import socket

def ottieni_indirizzo_ip():
    try:
        # Ottieni il nome host del client
        hostname = socket.gethostname()

        # Ottieni l'indirizzo IP associato al nome host
        indirizzo_ip = socket.gethostbyname(hostname)
        # s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        # s.connect(("8.8.8.8", 80))
        # print(s.getsockname()[0])
        typeindirizzo_ip=type(indirizzo_ip)
        print(f"******************L'indirizzo IP del client è: {indirizzo_ip}***********tipo{typeindirizzo_ip}***********")
        
        print(f"Il tipo della variabile è: {type(indirizzo_ip)}")
        return indirizzo_ip

    except socket.error as e:
        print(f"Errore nell'ottenere l'indirizzo IP: {e}")
        return None

