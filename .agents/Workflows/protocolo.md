---
description: Protocolo de Ejecución Micro-Quirúrgica para modificaciones de código
---

Este workflow rige cada intervención técnica en el proyecto para asegurar la integridad de la arquitectura y el diseño.

1. **Conceptualización**:
   - Discutir el problema o la nueva funcionalidad a nivel de Arquitectura y UX.
   - **Prohibido** leer o tocar código en este paso. El objetivo es el entendimiento mutuo.

2. **Proyección Teórica**:
   - Proponer soluciones conceptuales.
   - Definir qué Design Tokens se utilizarán.
   - Solicitar validación explícita del usuario antes de proceder al diagnóstico.

3. **Diagnóstico Escalonado**:
   - Leer el código afectado.
   - Generar un "Plan de Intervención" detallado contemplando dos dimensiones:
     - (A) Lógica Constructiva (Cimientos > Paredes > Cableado > Pintura).
     - (B) Curva de Dificultad (De lo más fácil a lo más complejo).

4. **Ejecución y Autorización Progresiva**:
   - Ejecutar los cambios paso a paso, solicitando permiso después de cada hito lógico.
   - Excepción de inercia: Se permite agrupar pasos de riesgo nulo o extrema sencillez avisando previamente al usuario.
   - Verificar cada cambio antes de pasar al siguiente punto del plan.
