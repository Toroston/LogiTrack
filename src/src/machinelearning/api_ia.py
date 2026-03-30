from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
app = Flask(__name__)
CORS(app)
modelo = joblib.load("modelo_logitrack_rf.pkl")
mapeo_tipo = {"Normal": 0, "Express": 1}
mapeo_restriccion = {"Ninguna": 0, "Fragil": 1, "Frio": 2, "Peligroso": 3}
mapeo_saturacion = {"Baja": 0, "Media": 1, "Alta": 2}
@app.route('/predecir', methods=['POST'])
def predecir():
    datos = request.json
    
    tipo_num = mapeo_tipo.get(datos['tipoEnvio'], 0)
    restriccion_num = mapeo_restriccion.get(datos['restricciones'], 0)
    saturacion_num = mapeo_saturacion.get(datos['saturacionRuta'], 0)
    
    df_nuevo = pd.DataFrame([[
        tipo_num, 
        datos['distanciaKm'], 
        datos['volumenM3'], 
        datos['ventanaHorariaHs'], 
        restriccion_num, 
        saturacion_num
    ]], columns=["tipoEnvio_num", "distanciaKm", "volumenM3", "ventanaHorariaHs", "restricciones_num", "saturacion_num"])
    prediccion = modelo.predict(df_nuevo)[0]
    return jsonify({"prioridad": prediccion})
if __name__ == '__main__':
    app.run(port=5000)