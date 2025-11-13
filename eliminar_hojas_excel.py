#!/usr/bin/env python3
"""
Script para eliminar hojas de Excel que contengan "REPORTE CONSULTAS" en su nombre
y guardar el resultado como FARMACIA_LAB.xlsx
"""

from openpyxl import load_workbook
import os

# Ruta del archivo de entrada
archivo_path = r"C:\Users\JOSE\Escritorio\MMC\CIATOB\postgre\migracion\extraccion\CIATOB AGENDA DIARIA 2025.xlsx"

# Nombre del archivo de salida
archivo_salida = r"C:\Users\JOSE\Escritorio\MMC\CIATOB\postgre\migracion\extraccion\FARMACIA_LAB.xlsx"

# Palabras clave para identificar hojas a eliminar
palabras_eliminar = "REPORTE CONSULTAS"

print(f"Cargando archivo: {archivo_path}")

# Cargar el archivo Excel
wb = load_workbook(archivo_path)

print(f"\nHojas encontradas en el archivo:")
for sheet_name in wb.sheetnames:
    print(f"  - {sheet_name}")

# Lista para almacenar las hojas que se eliminarán
hojas_a_eliminar = []

# Identificar hojas que contienen las palabras clave
for sheet_name in wb.sheetnames:
    if palabras_eliminar in sheet_name.upper():
        hojas_a_eliminar.append(sheet_name)

print(f"\nHojas que se eliminarán (contienen '{palabras_eliminar}'):")
if hojas_a_eliminar:
    for hoja in hojas_a_eliminar:
        print(f"  - {hoja}")
else:
    print("  Ninguna")

# Eliminar las hojas identificadas
for hoja in hojas_a_eliminar:
    del wb[hoja]
    print(f"✓ Hoja eliminada: {hoja}")

print(f"\nHojas restantes en el archivo:")
for sheet_name in wb.sheetnames:
    print(f"  - {sheet_name}")

# Guardar el archivo modificado
wb.save(archivo_salida)
print(f"\n✓ Archivo guardado exitosamente: {archivo_salida}")
print(f"Total de hojas en el archivo final: {len(wb.sheetnames)}")
