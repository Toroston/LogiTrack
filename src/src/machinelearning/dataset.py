import pandas as pd
import random

def generar_dataset(cantidad=1500):
    datos = []
    
    for _ in range(cantidad):
        tipo = random.choices(["Normal", "Express"], weights=[0.80, 0.20])[0]
        distancia = random.randint(5, 2500)
        ventana = random.randint(2, 12)
        volumen = round(random.uniform(0.1, 5.0), 2)
        restriccion = random.choices(["Ninguna", "Fragil", "Frio", "Peligroso"], weights=[0.55, 0.15, 0.15, 0.15])[0]
        saturacion = random.choices(["Baja", "Media", "Alta"], weights=[0.50, 0.35, 0.15])[0]
        if tipo == "Express":
            prioridad = "Alta"
        elif tipo == "Normal":
            if restriccion == "Peligroso":
                prioridad = "Alta"
            elif volumen >= 2.5:
                if ventana >= 6:
                    prioridad = "Baja"
                else:
                    prioridad = "Media"
            elif restriccion in ["Fragil", "Frio"]:
                if saturacion == "Alta" or ventana < 4:
                    prioridad = "Alta"
                else:
                    prioridad = "Media"
            else:
                if distancia < 1500 and ventana > 6 and saturacion in ["Baja", "Media"]:
                    prioridad = "Baja"
                elif saturacion == "Alta" and ventana < 4:
                    prioridad = "Alta"
                else:
                    prioridad = "Media"
                    
        datos.append([tipo, distancia, volumen, ventana, restriccion, saturacion, prioridad])
        
    columnas = ["tipoEnvio", "distanciaKm", "volumenM3", "ventanaHorariaHs", "restricciones", "saturacionRuta", "prioridad"]
    df = pd.DataFrame(datos, columns=columnas)
    
    df.to_csv("dataset_envios_mock.csv", index=False, encoding='utf-8')
    
    print("¡Dataset actualizado con éxito! Así quedaron distribuidas las prioridades:")
    print(df['prioridad'].value_counts())

if __name__ == "__main__":
    generar_dataset()