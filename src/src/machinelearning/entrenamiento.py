import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

df = pd.read_csv("dataset_envios_mock.csv")
mapeo_tipo = {"Normal": 0, "Express": 1}
mapeo_restriccion = {"Ninguna": 0, "Fragil": 1, "Frio": 2, "Peligroso": 3}
mapeo_saturacion = {"Baja": 0, "Media": 1, "Alta": 2}
df["tipoEnvio_num"] = df["tipoEnvio"].map(mapeo_tipo)
df["restricciones_num"] = df["restricciones"].map(mapeo_restriccion)
df["saturacion_num"] = df["saturacionRuta"].map(mapeo_saturacion)
X = df[["tipoEnvio_num", "distanciaKm", "volumenM3", "ventanaHorariaHs", "restricciones_num", "saturacion_num"]]
y = df["prioridad"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
modelo_rf = RandomForestClassifier(n_estimators=100, random_state=42)
modelo_rf.fit(X_train, y_train)
predicciones = modelo_rf.predict(X_test)
precision = accuracy_score(y_test, predicciones)
print(f"Precisión general del modelo: {precision * 100:.2f}%")
print("\nReporte detallado por clase:")
print(classification_report(y_test, predicciones))
joblib.dump(modelo_rf, "modelo_logitrack_rf.pkl")
print("\n¡Éxito! La IA fue entrenada y guardada en el archivo 'modelo_logitrack_rf.pkl'")