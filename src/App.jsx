import { useState, useEffect } from 'react'
import ChapterList from './components/ChapterList'
import ChapterEditor from './components/ChapterEditor'
import PreviewModal from './components/PreviewModal'
import ImportModal from './components/ImportModal'
import AsistenteIA from './components/AsistenteIA'
import './App.css'

const INITIAL_CHAPTERS = [
  {
    id: '1',
    title: 'Fundamentos de la Percepción y la Pre-Creencia',
    description: 'De la percepción a la visión: génesis del mundo vivido y cosmologías del sentir',
    sections: [
      {
        id: 's1',
        title: 'Introducción: La Posición del Recién Nacido',
        content: 'En las ceremonias del desierto, se pide a los participantes colocarse en la posición del recién nacido. Este gesto simple prepara para recibir la medicina. Marca el **renonciamiento al saber adquirido**, el retorno al estado primero de disponibilidad.\n\nEn la mitología wixárika, la creación del mundo procede de un movimiento análogo: todo comienza por un nacimiento, una emergencia de la luz desde las profundidades. El primer sol no se levanta sino después de la ofrenda de los ancestros y del venado primordial.\n\n**De este sacrificio surge la visión; de la visión, el mundo.**\n\nColocarse en posición de recién nacido es regresar a ese momento originario donde **percibir, creer e imaginar son uno solo**. Donde el mundo no está aún separado entre visible e invisible, materia y espíritu, saber y misterio.'
      },
      {
        id: 's2',
        title: 'La Percepción del Bebé: Jerarquización Sensorial',
        content: 'La percepción del recién nacido nunca es bruta. Desde las primeras semanas de vida, está estructurada por **anticipaciones biológicas y relacionales**.\n\nEl cerebro del lactante jerarquiza los estímulos según esquemas innatos:\n\n• **Circuitos visuales y temporales**: Reaccionan más a los rostros que a formas indiferenciadas\n• **Tronco cerebral y cortex auditivo**: Se sincronizan al ritmo de la voz humana\n• **Áreas somatosensoriales**: Priorizan la calidez y el contacto cutáneo\n\nEsta jerarquización biológica constituye un **mecanismo de economía atencional**: el cerebro selecciona lo que tiene valor adaptativo, lo que señala la presencia de otro humano y asegura la continuidad vital.\n\n**El mundo no es neutro: es percibido de entrada como respondiente.**'
      },
      {
        id: 's3',
        title: 'La Pre-Creencia Sensorial y Fe Perceptiva',
        content: 'Por la repetición de las respuestas parentales — mirada, tacto, voz — el cerebro del bebé establece **predicciones estables** sobre las reacciones del mundo.\n\nEstas regularidades moldean la estructura perceptiva de lo real e inscriben en el cuerpo una **confianza implícita** hacia el entorno.\n\nMerleau-Ponty nombra esto la **"fe perceptiva"**: esa adhesión tácita del cuerpo al mundo antes de toda reflexión.\n\n### La Pre-Creencia\n\nNo es una creencia formulada, sino una **adhesión corporal a lo real**:\n\n• El mundo está ahí, coherente, habitable\n• Responde a mis gestos\n• Es digno de confianza\n\nEsta confianza se construye a través de la regularidad de las experiencias relacionales: la calidez regresa, la voz responde, la luz se mantiene.\n\n**La creencia no aparece después de la percepción; es su condición de formación.**'
      },
      {
        id: 's4',
        title: 'Formación de la Confianza Primaria',
        content: 'Los trabajos de **Piaget, Trevarthen y Stern** han mostrado que el niño construye activamente su entorno perceptivo.\n\n**Coordinación sensoriomotriz**, reconocimiento de rostros y sincronización emocional producen el primer orden del mundo.\n\nEste pasaje del flujo sensorial a la forma perceptiva instituye un **principio de confianza**: el mundo responde, regresa, se mantiene.\n\n### Marcadores Somáticos (Damasio)\n\nLas emociones proporcionan al sistema nervioso **marcadores somáticos** que aseguran la continuidad identitaria y temporal:\n\n• Ritmo cardíaco\n• Tensión muscular\n• Actividad visceral\n\nEstas huellas se convierten en **memorias corporales** que señalan lo que es vitalmente favorable o amenazante.\n\n**Las emociones vinculan las experiencias presentes con la memoria vivida, dando al cuerpo el sentimiento de un mundo estable y habitable.**'
      },
      {
        id: 's5',
        title: 'PRÁCTICA: Regresión Perceptiva',
        content: '### Ejercicio de Reconexión con la Pre-Creencia Sensorial\n\n**Preparación** (5 minutos):\n• Colócate en posición fetal, preferentemente sobre el lado derecho\n• Cierra los ojos suavemente\n• Respira con lentitud y profundidad\n\n**Fase 1 - Percepción Básica** (10 minutos):\n1. Lleva tu atención a las sensaciones de contacto con el suelo\n2. Percibe la temperatura del aire sobre tu piel\n3. Escucha los sonidos sin nombrarlos\n4. Simplemente **siente sin interpretar**\n\n**Fase 2 - Pre-Creencia** (10 minutos):\n1. Observa qué sensaciones te generan confianza\n2. ¿Qué percepciones te hacen sentir seguro?\n3. ¿Dónde en tu cuerpo se asienta esa confianza?\n\n**Integración** (5 minutos):\nRegistra en tu diario:\n• ¿Qué descubriste sobre tu fe perceptiva?\n• ¿Qué sensaciones eran familiares, como memorias ancestrales?\n• ¿Qué mundo emerge cuando percibes sin juzgar?'
      }
    ]
  },
  {
    id: '2',
    title: 'Imaginación y Percepción Participativa',
    description: 'El despertar diferenciador y el pensamiento animista como sabiduría',
    sections: [
      {
        id: 's6',
        title: 'El Despertar Diferenciador (2-4 años)',
        content: 'Con la marcha, el habla y la coordinación motriz, la percepción se convierte en **exploración**: el niño actúa sobre el mundo para comprenderlo.\n\nToca, rompe, prueba, escucha, repite — lo real se abre entonces como un inmenso terreno de experimentación.\n\n### La Fluidez Sujeto-Objeto\n\nLa distinción entre sujeto y objeto comienza a formarse, pero permanece aún **fluida**: el niño no ha aprendido todavía a separar plenamente la percepción de la relación.\n\n**Los psicólogos evocan el pensamiento animista:**\n\n• Los objetos están vivos\n• Las nubes "quieren" moverse\n• Los juguetes experimentan emociones e intenciones\n\n### No es un Error Cognitivo\n\nEsta proyección de la vida en las cosas **no es un error cognitivo**, sino la expresión de una conciencia naturalmente participativa.\n\nEl niño atribuye al mundo la misma vivacidad que a su propio cuerpo, porque **se siente todavía profundamente vinculado a él**.'
      },
      {
        id: 's7',
        title: 'El Pensamiento Animista: Sabiduría Olvidada',
        content: 'Para el niño de 2 a 4 años, el mundo permanece **vivo**, percibido como prolongación directa del cuerpo: todo lo que es percibido se convierte potencialmente en interlocutor.\n\nSe trata de una primera **"ecología de lo sensible"**.\n\n### La Creencia como Percepción Extendida\n\nLa creencia se invita como prolongación natural de la percepción. Aquí, **creer no es todavía una construcción social** o un saber aprendido: es una modalidad de la percepción misma.\n\n**Creer, para el niño, es continuar percibiendo más allá de lo visible:**\n\n• Presentir una voluntad\n• Presentir una memoria\n• Presentir una presencia en los seres y las cosas\n\n### Ontología de la Participación\n\nEsta forma de creencia diseña una **ontología de la participación**:\n\n• Todo está vinculado\n• Todo actúa\n• Todo responde en el universo infantil\n\n**Deborah Kelemen** (2012) habla de una "tendencia teleológica natural": los niños suponen que todo tiene una intención o una finalidad.\n\n*"El sol brilla para calentarme"* — Esta proyección de intención manifiesta una lógica perceptiva: si el mundo responde, es porque quiere algo.'
      },
      {
        id: 's8',
        title: 'La Imaginación como Facultad Chamánica',
        content: 'Charles Stepanoff explica el rol de la imaginación en la caza y cómo la imaginación como **facultad humana** se desarrolló y se volvió fundamental para poder cazar.\n\n### La Imaginación en la Caza\n\nUn perro que busca una presa utilizará su olfato para encontrarla. El cazador no tiene ese olfato.\n\n**El cazador humano:**\n\n1. Encuentra un rastro\n2. Lo identifica\n3. **Imagina** de qué animal se trata\n4. **Imagina** su comportamiento\n5. **Imagina** su vida para imaginar dónde puede encontrarse\n6. Si es un animal grande, **imagina en común** una estrategia para cazar\n\n### Imaginación como Percepción No-Sensorial\n\nLa relación entre el olfato del perro y la imaginación del cazador muestra que **la imaginación es percepción no-sensorial**.\n\n**La imaginación es la capacidad de:**\n\n• Movilizar percepciones no-sensoriales\n• Sumergirse en situaciones diferentes al "aquí y ahora"\n• Conectarse con la interioridad de los seres que habitan el mundo\n\n### El Invisible\n\nLos chamanes se conectan con **el invisible** por medio de la imaginación y los sueños.\n\nEl invisible se puede definir como un **mundo de percepción no-sensorial** donde todo está vivo, donde todo es relación.'
      },
      {
        id: 's9',
        title: 'Lenguaje Performativo y Acción Simbólica',
        content: 'A los 2-4 años, el lenguaje **no sirve todavía para describir**: prolonga la acción. La palabra es un gesto sonoro.\n\n**Decir es actuar sobre la realidad.**\n\n### Las Primeras Frases son Performativas\n\nModifican el campo de percepción. Esta fusión entre palabra, gesto y percepción constituye la primera arquitectura simbólica de la creencia.\n\n**Vygotsky** (Pensamiento y lenguaje, 1934) añade que "el lenguaje permite al niño transformar sus percepciones en conceptos, pero esta transformación pasa por una fase donde **las palabras son mágicas, cargadas de poder**".\n\n### El Canto Chamánico\n\nEn las tradiciones chamánicas, el canto no es una representación simbólica: es una **acción directa sobre el mundo invisible**.\n\n**Stepanoff** compara esta memoria vibratoria a los "cantos de poder" de los chamanes siberianos:\n\n*"Estos cantos no son símbolos, sino frecuencias que reactivan estados de consciencia donde el mundo se revela como una red de resonancias."*\n\n### Práctica del Verbo Creador\n\nEn el metachamanismo, recuperamos esta dimensión performativa del lenguaje:\n\n• La palabra como vibración\n• La palabra como creación\n• La palabra como puente entre mundos'
      },
      {
        id: 's10',
        title: 'PRÁCTICA: Reconexión con la Percepción Participativa',
        content: '### Ejercicio de Animismo Consciente\n\n**Preparación** (5 minutos):\n• Elige un objeto natural (piedra, planta, agua)\n• Colócalo frente a ti\n• Respira profundamente tres veces\n\n**Fase 1 - Percepción Participativa** (15 minutos):\n\n1. **Observa** el objeto sin nombrarlo\n2. Pregúntate: *"¿Qué quiere este ser?"*\n3. **Escucha** la respuesta que surge de tu cuerpo, no de tu mente\n4. **Imagina** la vida interior de este ser:\n   • ¿Qué siente?\n   • ¿Qué recuerda?\n   • ¿Qué desea?\n\n**Fase 2 - Diálogo** (10 minutos):\n\n1. Habla al objeto en voz alta\n2. Preséntate\n3. Pregunta: *"¿Qué mensaje tienes para mí?"*\n4. Escucha con todo tu cuerpo la respuesta\n\n**Fase 3 - Canto Performativo** (10 minutos):\n\n1. Deja que emerja un sonido de tu garganta\n2. No lo controles, déjalo fluir\n3. Este es tu **canto de relación** con este ser\n4. Repítelo tres veces\n\n**Integración**:\n\nRegistra:\n• ¿Qué descubriste sobre la vida del objeto?\n• ¿Cómo cambió tu percepción al tratarlo como vivo?\n• ¿Qué sentiste en tu cuerpo durante el diálogo?'
      }
    ]
  },
  {
    id: '3',
    title: 'Metachamanismo y Tecnología de la Consciencia',
    description: 'Del sentir al creer: memoria vibratoria y ciencia chamánica',
    sections: [
      {
        id: 's11',
        title: 'Marcadores Somáticos y Memoria del Cuerpo',
        content: 'Los trabajos de **Antonio Damasio** muestran que las emociones no son simples agregados subjetivos, sino **marcadores corporales fundamentales** para la coherencia de lo vivido.\n\n### El Proceso de los Marcadores Somáticos\n\nA cada emoción corresponde un **estado fisiológico determinado**:\n\n• Ritmo cardíaco\n• Tensión muscular\n• Actividad visceral\n\nQue el cerebro registra y asocia a situaciones precisas.\n\nCon la experiencia, estas huellas se convierten en **marcadores somáticos**: empreintes corporelles que señalan lo que es vitalmente favorable o amenazante.\n\n### Reactivación Pre-Reflexiva\n\nFrente a una situación nueva, estos marcadores se reactivan **antes de toda reflexión consciente**, orientando así:\n\n• La percepción\n• La atención\n• La decisión según la memoria corporal acumulada\n\n**Este proceso asegura la continuidad identitaria y temporal de la consciencia.**\n\n### Niveles de Función\n\n• **Plano biológico**: Las emociones codifican el valor vital de las experiencias\n• **Plano cognitivo**: Los marcadores somáticos guían las elecciones y la decisión\n• **Plano fenomenológico**: Mantienen el sentimiento de un yo continuo en el flujo de lo vivido'
      },
      {
        id: 's12',
        title: 'Memoria Vibratoria y Resonancia',
        content: 'El metachamanismo propone una **lectura energética** de este proceso:\n\n**Cada experiencia de resonancia sensorial instala en el cuerpo una memoria vibratoria.**\n\n### Creer es Mantener la Frecuencia\n\nCreer es mantener la frecuencia de un mundo fiable. La percepción se nutre de esta fidelidad implícita; se convierte en la **matriz del sentido**.\n\n**François Stepanoff** (Viajar en lo invisible, 2019) compara esta memoria vibratoria a los "cantos de poder" de los chamanes siberianos:\n\n*"Estos cantos no son símbolos, sino frecuencias que reactivan estados de consciencia donde el mundo se revela como una red de resonancias."*\n\n### Confirmación Neurocientífica\n\n**Robin Carhart-Harris** (2016) ha mostrado que los estados de trance chamánico (inducidos por la ayahuasca) activan redes cerebrales similares a las de los recuerdos precoces, confirmando la idea de una **memoria vibratoria**.\n\n### El Cuerpo como Instrumento\n\nBajo esta lectura metachamánica, cada etapa del desarrollo es un **aprendizaje de resonancia**.\n\n**La atención es un gesto energético** por el cual el ser se acuerda con lo real:\n\n• La mirada se convierte en canto\n• La percepción en participación creadora\n• El cuerpo en instrumento de sintonización con el mundo'
      },
      {
        id: 's13',
        title: 'Ciencia Chamánica: Investigar el Mundo Invisible',
        content: 'Es necesario tener una noción de estos temas antes de entrar en el metachamanismo, porque el metachamanismo trata de las **creencias**.\n\nBusca entender cómo evolucionaron las creencias y formas de percepción del otro mundo con una **perspectiva global**.\n\n### Definir la Ciencia Chamánica\n\nPara investigar la naturaleza del otro mundo, necesitamos establecer la base para el metachamanismo a través de la **"tecnología chamánica"**.\n\n**Las principales tecnologías chamánicas son:**\n\n• **El canto**: Frecuencias que modifican el estado de consciencia\n• **La imaginación**: Percepción no-sensorial que accede a lo invisible\n• **El sueño**: Viaje consciente en el mundo no-ordinario\n• **El ritmo**: Tambor, maracas, que sincronizan el cerebro\n• **Las plantas maestras**: Ayahuasca, hongos, que abren canales de percepción\n\n### Metodología de Investigación\n\nLa ciencia chamánica no se basa en la fe ciega, sino en la **experimentación directa**:\n\n1. **Formulación de pregunta**: ¿Qué quiero saber del mundo invisible?\n2. **Elección de tecnología**: ¿Qué herramienta es apropiada?\n3. **Práctica**: Experiencia directa en estado modificado\n4. **Verificación**: ¿Los resultados son replicables?\n5. **Integración**: ¿Qué comprensión aporta esto a mi vida?\n\n### Relaciones con el Invisible\n\nEn cuanto a los espíritus, desde el punto de vista chamánico hay **diferentes tipos de relaciones** con las entidades:\n\n• **Negociación** (horizontal): Relación de igual a igual\n• **Sacrificio** (vertical): Ofrenda a entidades superiores\n• **Rezo** (vertical): Petición a poderes mayores'
      },
      {
        id: 's14',
        title: 'Integración: Del Sentir al Creer',
        content: '### La Continuidad Vibratoria\n\n**"Creer, en el origen, significa confiarse al ritmo del mundo."**\n\nEl metachamanismo interroga este pasaje del sentir a la confianza: ¿Cómo el acuerdo perceptivo se convierte en matriz de sentido?\n\n### Los Tres Niveles de Integración\n\n**1. Nivel Corporal - Pre-Creencia Sensorial**\n\n• Confianza implícita en las sensaciones\n• El cuerpo sabe antes que la mente\n• Marcadores somáticos guían la acción\n\n**2. Nivel Perceptivo - Fe Participativa**\n\n• El mundo es percibido como vivo y respondiente\n• La imaginación extiende la percepción\n• Todo está en relación\n\n**3. Nivel Metachamánico - Resonancia Consciente**\n\n• Elección consciente de frecuencia\n• Cultivar estados de coherencia\n• Tecnología para navegar lo invisible\n\n### El Desafío Contemporáneo\n\nEn el mundo moderno hemos **perdido esta continuidad**:\n\n• Percepción separada de la emoción\n• Razón separada del cuerpo\n• Visible separado del invisible\n\nEl metachamanismo propone **reintegrar** estas dimensiones, no por nostalgia del pasado, sino como **evolución consciente** hacia una percepción más completa de lo real.'
      },
      {
        id: 's15',
        title: 'PRÁCTICA: Cultivar la Fe Perceptiva',
        content: '### Ejercicio de Integración Final\n\n**Preparación** (10 minutos):\n\n• Crea un espacio sagrado\n• Enciende una vela\n• Coloca objetos naturales que hayas trabajado\n• Siéntate en posición cómoda\n\n**Fase 1 - Anclaje Somático** (10 minutos):\n\n1. Explora tu cuerpo con la atención\n2. Identifica **dónde** vive tu confianza primaria\n3. ¿En qué parte del cuerpo sientes que el mundo es fiable?\n4. Respira hacia ese lugar, amplificando la sensación\n\n**Fase 2 - Percepción Extendida** (15 minutos):\n\n1. Con los ojos cerrados, extiende tu percepción\n2. **Siente** el espacio alrededor de tu cuerpo\n3. **Imagina** las presencias invisibles en la habitación\n4. Sin juzgar, simplemente **nota** qué percibes más allá de lo sensorial\n\n**Fase 3 - Diálogo con lo Invisible** (15 minutos):\n\n1. Formula una pregunta a lo invisible:\n   *"¿Qué necesito comprender sobre la naturaleza de la realidad?"*\n2. **No esperes palabras**\n3. Permanece en escucha corporal\n4. Las respuestas pueden venir como:\n   • Sensaciones\n   • Imágenes\n   • Intuiciones\n   • Resonancias emocionales\n\n**Fase 4 - Canto de Cierre** (10 minutos):\n\n1. Deja que emerja un canto de tu interior\n2. Este es tu **canto de gratitud** a lo invisible\n3. Canta hasta que sientas que está completo\n\n**Integración en Diario**:\n\n• ¿Qué descubriste sobre tu fe perceptiva?\n• ¿Cómo es tu relación con lo invisible?\n• ¿Qué prácticas resonaron más profundamente?\n• ¿Cómo integrarás esto en tu vida diaria?\n\n### Práctica Continua\n\n**El metachamanismo no es un seminario que termina, es un camino de vida.**\n\nSugerencias para la práctica diaria:\n\n• **Mañana**: 5 minutos de percepción sin juicio\n• **Tarde**: Dialogar con un ser natural\n• **Noche**: Registrar los sueños y visiones\n• **Semanal**: Ceremonia personal de gratitud\n• **Mensual**: Círculo de práctica con comunidad'
      }
    ]
  },
  {
    id: '4',
    title: 'Definición y Ejes del Metachamanismo',
    description: 'Una metodología de conocimiento del mundo invisible: fundamentos teóricos y prácticos',
    sections: [
      {
        id: 's16',
        title: 'Qué es el Metachamanismo',
        content: 'El metachamanismo es una **metodología de conocimiento del "mundo invisible"**, a la vez teórica y práctica, fundada en las tradiciones chamánicas pero sobrepasando los marcos culturales y dogmáticos propios a cada tradición.\n\n### Una Forma de Investigación Transdisciplinaria\n\nEs una forma de investigación **transdisciplinaria y experimental**, enraizada en:\n\n• La experiencia personal\n• Los rituales\n• La visión\n• La interacción con los espíritus\n\nTodo esto iluminado por la antropología, la filosofía y la historia de las religiones.\n\n### Posicionamiento Único\n\n**Ni sincretismo ingenuo, ni tradicionalismo fijado.**\n\n**Ni puro esoterismo, ni pura ciencia social.**\n\nEl metachamanismo es una **praxis híbrida**, articulando:\n\n• Experiencia ritual\n• Consciencia crítica\n• Apertura transdisciplinaria\n\n### Objetivo Central\n\n"Ofrecer una vía contemporánea de exploración interior y de sanación adaptada al hombre moderno en crisis de sentido."\n\nTejer un diálogo entre tradiciones espirituales y pensamiento crítico, permaneciendo anclado en la práctica y la experiencia vivida.'
      },
      {
        id: 's17',
        title: 'Las Tecnologías Chamánicas',
        content: 'El metachamanismo se apoya en **herramientas precisas** provenientes de las tradiciones. Estas "tecnologías de la consciencia" permiten un trabajo de reconfiguración interior y una comunicación con los seres invisibles.\n\n### Principales Tecnologías\n\n**1. El Canto (Icaro)**\n\n• Frecuencias que modifican el estado de consciencia\n• Vehículo de sanación y transformación\n• Puente entre mundos\n\n**2. Las Dietas (Ayunos y Restricciones)**\n\n• Limpieza física y energética\n• Sensibilización perceptiva\n• Apertura a las enseñanzas de las plantas\n\n**3. El Silencio y la Soledad**\n\n• Retiro de los estímulos ordinarios\n• Profundización de la escucha interior\n• Encuentro con lo esencial\n\n**4. El Sueño Lúcido**\n\n• Viaje consciente en el mundo no-ordinario\n• Aprendizaje y sanación onírica\n• Comunicación con maestros invisibles\n\n**5. Las Plantas Maestras**\n\n• Ayahuasca, peyote, hongos sagrados\n• Apertura de canales de percepción\n• Enseñanza directa de los espíritus vegetales\n\n**6. El Fuego Ritual**\n\n• Elemento de transformación\n• Testigo sagrado\n• Portal entre dimensiones\n\n### Principio Fundamental\n\nEstas tecnologías **no son símbolos**, sino **agentes activos** que producen efectos reales en la consciencia, el cuerpo y la relación con el mundo invisible.'
      },
      {
        id: 's18',
        title: 'Superación de Condicionamientos Culturales',
        content: 'El metachamanismo invita a una **puesta entre paréntesis** (epojé fenomenológica) de las creencias personales, religiosas o científicas.\n\n### La Competencia Epistemológica\n\nLa competencia epistemológica designa la capacidad de:\n\n• **Movilizar** diferentes marcos de conocimiento\n• **Comparar** sin jerarquizar absolutamente\n• **Desplazar** según las necesidades de la situación\n• **Articular** diversos regímenes de verdad\n\n### No se Trata de:\n\n❌ Abandonar la racionalidad\n❌ Adoptar todas las creencias indiscriminadamente\n❌ Caer en el relativismo total\n\n### Se Trata de:\n\n✅ Identificar a qué régimen de conocimiento pertenece cada experiencia\n✅ Cambiar de registro según el contexto\n✅ Dialogar entre regímenes sin absolutizarlos\n✅ Permanecer consciente de la propia posición\n\n### Ejemplo Práctico\n\n**Ante una visión en ceremonia:**\n\n• **Nivel fenomenológico**: ¿Qué experimento directamente?\n• **Nivel simbólico**: ¿Qué significa en el contexto cultural?\n• **Nivel neurobiológico**: ¿Qué procesos cerebrales están activos?\n• **Nivel ontológico**: ¿Qué revela sobre la naturaleza de la realidad?\n\n**El metachamanismo navega entre estos niveles sin reducir uno al otro.**\n\n### Hacia un Pluralismo Epistemológico\n\n"No se trata de regresar a un mundo encantado tal como fue, sino de abrir un mundo relacional capaz de dialogar con la diversidad de las cosmologías humanas."'
      },
      {
        id: 's19',
        title: 'Relación Viviente con las Entidades',
        content: 'El autor insiste en la **realidad relacional** del mundo chamánico: las plantas, los cantos, los espíritus **no son símbolos, sino agentes activos**.\n\n### Las Plantas como Maestros\n\nLas plantas maestras no son sustancias pasivas que "producen efectos". Son **seres inteligentes** con:\n\n• Intencionalidad propia\n• Capacidad de enseñar\n• Voluntad de sanar o de castigar\n• Memoria ancestral\n\n### Los Espíritus como Personas-Modales\n\nLas entidades del mundo-otro son **personas-modales**:\n\n• **Éticas**: Juzgan, sanan o castigan\n• **Plásticas**: Cambian de forma o apariencia\n• **Mixtas**: Combinan aspectos vegetales, animales, humanos, sonoros o lumínicos\n\n**Reaccionan a:**\n• La atención que se les presta\n• El respeto demostrado\n• La calidad del canto\n• La postura del cuerpo\n\n### Tipos de Relación\n\nDesde el punto de vista chamánico hay **diferentes tipos de relaciones** con las entidades:\n\n**1. Negociación (Horizontal)**\n• Relación de igual a igual\n• Intercambio de dones\n• Alianza estratégica\n\n**2. Sacrificio (Vertical)**\n• Ofrenda a entidades superiores\n• Reconocimiento de jerarquía\n• Petición de favores\n\n**3. Rezo (Vertical)**\n• Petición a poderes mayores\n• Súplica y humildad\n• Fe en la benevolencia\n\n**4. Incorporación (Íntima)**\n• La entidad entra en el cuerpo\n• Fusión temporaria\n• Transmisión directa de conocimiento\n\n### Principio Fundamental\n\n"Se trata de incorporar estas entidades en el cuerpo y el espíritu del practicante para generar sanación, saber o transformación."'
      },
      {
        id: 's20',
        title: 'PRÁCTICA: Diálogo con una Planta Maestra',
        content: '### Ejercicio de Aproximación Respetuosa\n\n**Preparación** (varios días):\n\n1. **Elección de la Planta**\n   • Elige una planta accesible (tabaco, ruda, romero, salvia)\n   • Investiga sus usos tradicionales\n   • Observa cómo crece en tu entorno\n\n2. **Dieta de Preparación** (3 días):\n   • Sin sal, azúcar, picante, alcohol, sexo\n   • Comida simple y liviana\n   • Silencio lo más posible\n\n**Fase 1 - Ofrenda** (día del encuentro):\n\n1. Lleva una ofrenda a la planta (agua, tabaco, flores)\n2. Pide permiso en voz alta:\n   *"Madre [nombre de la planta], vengo con respeto a aprender de ti. ¿Me aceptas como estudiante?"*\n3. Espera en silencio una señal (brisa, sensación corporal, pensamiento claro)\n\n**Fase 2 - Consumo Ritual** (si la planta es comestible):\n\n1. Prepara un té simple de la planta\n2. Antes de beber, agradece:\n   *"Gracias por compartir tu medicina conmigo"*\n3. Bebe lentamente, con atención plena\n\n**Fase 3 - Escucha Activa** (2-3 horas):\n\n1. Siéntate en presencia de la planta o con los ojos cerrados\n2. **No esperes visiones espectaculares**\n3. Nota:\n   • Cambios sutiles en la percepción\n   • Pensamientos que surgen\n   • Sensaciones corporales\n   • Emociones emergentes\n\n**Fase 4 - Integración**:\n\nRegistra en tu diario:\n\n• ¿Qué te mostró la planta?\n• ¿Qué cualidades tiene su presencia?\n• ¿Qué te pide cambiar en tu vida?\n• ¿Cómo te sientes después del encuentro?\n\n**Fase 5 - Compromiso**:\n\n1. Agradece a la planta\n2. Pregunta: *"¿Qué puedo hacer por ti?"*\n3. Escucha la respuesta\n4. Cumple tu compromiso (puede ser cuidar otras plantas, compartir su enseñanza, proteger su hábitat)\n\n### Advertencias\n\n⚠️ **No consumas plantas que no conoces**\n⚠️ **Investiga contraindicaciones médicas**\n⚠️ **Comienza siempre con dosis mínimas**\n⚠️ **Ten un espacio seguro y supervisión si es necesario**'
      }
    ]
  },
  {
    id: '5',
    title: 'El Mundo-Otro: Estructura y Navegación',
    description: 'Un régimen de existencia autónomo: espacio vibratorio, tiempo modal y relaciones activas',
    sections: [
      {
        id: 's21',
        title: 'Naturaleza del Mundo-Otro',
        content: 'En las cosmologías chamánicas, el **mundo-otro** no es un lugar separado en el espacio o el tiempo. No es un "más allá" trascendental. Constituye un **régimen de existencia autónomo**, estructurado, habitado, ordenado según su propia lógica.\n\n### No es un Arrière-Monde\n\nEl mundo-otro no es:\n\n❌ Un cielo lejano\n❌ Una dimensión paralela inaccesible\n❌ Una fantasía o ilusión\n❌ Un mundo "mejor" que éste\n\n### Es un Otro Modo de Mundo\n\nEs un **mundo coexistente** con el mundo ordinario, pero de **cualidad diferente**:\n\n• Constituido no de objetos, sino de **relaciones activas**\n• Poblado de **fuerzas diferenciadas**\n• Habitado por **formas de presencia** que no se manifiestan según las coordenadas habituales de la percepción\n\n### Características Fundamentales\n\n**1. Todo es Agentivo**\n\nLos elementos, las plantas, los soplos, los cantos, los colores, las entidades — todos son portadores de:\n\n• Intención\n• Memoria\n• Deseo\n• Poder\n\n**2. Las Formas son Mouvantes**\n\n• Vivas y relacionales\n• No están fijadas\n• Reaccionan a la atención\n• Se transforman en la interacción\n\n**3. Los Flujos son Estructuras\n\nLos verdaderos organizadores del mundo-otro son:\n\n• Flujos de soplo\n• Flujos de canto\n• Flujos de luz\n• Flujos de perfume\n\n**El mundo-otro está organizado no por leyes físicas, sino por ejes de resonancia, densidades cualitativas, correspondencias rituales.**'
      },
      {
        id: 's22',
        title: 'Espacio Vibratorio y Navegación',
        content: 'En el mundo-otro, el espacio **no es geométrico sino vibratorio**. No es homogéneo: está estriado, habitado, orientado.\n\n### Características del Espacio-Otro\n\n**No se desplaza uno como en un mapa** — se atraviesan:\n\n• Campos de fuerza\n• Cambios de nivel\n• Acordes a ambiances o motifs\n\n### El Kené Shipibo\n\nEl **kené** (diseño geométrico shipibo) es una traducción gráfica de este espacio:\n\n• No representa un territorio\n• Es una **trama energética**\n• Un **red de pasajes y umbrales**\n• Una cartografía de resonancias\n\n### Vectores de Navegación\n\nLos medios para navegar este espacio son:\n\n**1. El Canto**\n• Modula las frecuencias\n• Abre portales\n• Armoniza campos de fuerza\n\n**2. El Soplo**\n• Dirige la intención\n• Limpia obstáculos\n• Crea caminos\n\n**3. El Silencio**\n• Permite la escucha\n• Revela las presencias\n• Estabiliza la percepción\n\n### Lógica de Navegación\n\n**No se "va a" un lugar** — se **se acuerda con** una frecuencia.\n\nLa navegación en el mundo-otro es un acto de **sintonización**, no de desplazamiento lineal.\n\n### Ejemplo Práctico\n\nPara "visitar" el espíritu de la ayahuasca:\n\n1. No se busca geográficamente\n2. Se **canta** su icaro específico\n3. El canto **crea** el camino\n4. La presencia **emerge** en el campo perceptivo\n5. El encuentro ocurre en un **espacio intermedio**\n\nEste espacio intermedio no está "en" la mente ni "fuera" — es una **zona de contacto** donde la consciencia humana y la presencia de la planta se encuentran.'
      },
      {
        id: 's23',
        title: 'Tiempo Modal: Pasado Vivo y Futuro Potencial',
        content: 'El mundo-otro no sigue una temporalidad cronológica. El tiempo es **événementiel, intensif**, a menudo circular o espiral.\n\n### Características del Tiempo-Otro\n\n**No es lineal:**\n\n• No hay un "antes" y "después" absolutos\n• Los eventos no están ordenados secuencialmente\n• El tiempo se **enrolla** sobre sí mismo\n\n**Es modal:**\n\n• Cada momento tiene una **cualidad** propia\n• El tiempo se mide por **intensidad**, no por duración\n• Un instante puede contener eternidades\n\n### Lo que se Puede Encontrar\n\nEn el tiempo modal del mundo-otro, uno puede encontrar:\n\n• **El pasado viviente**: Ancestros, memorias colectivas\n• **El futuro potencial**: Posibilidades aún no manifestadas\n• **El recuerdo de un ser**: Su esencia más allá de su vida física\n• **La huella de una enfermedad**: Su origen temporal\n• **El espíritu de un acto aún no realizado**: Intenciones en gestación\n\n### El Canto como Modulador Temporal\n\nEl canto actúa como **modulador temporal**:\n\n• **Ralentiza** el tiempo para permitir la observación detallada\n• **Condensa** experiencias largas en momentos breves\n• **Desenrolla** las escenas vividas para su revisión\n\n### Tiempo Resonante\n\nEs un mundo de **tiempo resonante**, donde:\n\n• El sueño\n• El mito\n• La visión\n\n**No son relatos, sino actos efectivos.**\n\n### Ejemplo de Sanación Temporal\n\nEn una ceremonia de ayahuasca:\n\n1. El curandero "ve" el origen de la enfermedad\n2. Este origen puede estar en el pasado (trauma), presente (hechizo), o futuro (destino no alineado)\n3. El curandero "viaja" a ese momento temporal\n4. **Modifica** la configuración energética de ese evento\n5. Los efectos se propagan al presente\n\nEsto no es "cambiar el pasado" en sentido occidental, sino **reconfigurar la resonancia** que ese evento mantiene en el campo temporal del paciente.'
      },
      {
        id: 's24',
        title: 'Entidades y Estructura Relacional',
        content: 'El mundo-otro está estructurado no por leyes mecánicas, sino por **relaciones activas y diferenciadas**.\n\n### Todo es Interactuante\n\nTodo lo que circula en el mundo-otro se inscribe en un **campo relacional de fuerzas**:\n\n• Niwe (fuerza vital shipibo)\n• Sami (energía refinada andina)\n• Noya (poder concentrado)\n• Soplo\n• Canto\n• Humo\n• Intención\n\nLa **calidad del vínculo** determina los efectos.\n\n### Tipos de Relaciones\n\n**1. Relación de Cuidado**\n• Sanación mutua\n• Protección\n• Nutrición energética\n\n**2. Relación de Agresión**\n• Ataque espiritual\n• Extracción de energía\n• Enfermedad inducida\n\n**3. Relación de Alianza**\n• Apoyo mutuo\n• Intercambio de dones\n• Protección recíproca\n\n**4. Relación de Parentesco Invisible**\n• Conexión ancestral\n• Vínculo de espíritus afines\n• Familia espiritual\n\n**5. Relación de Influencia Sutil**\n• Inspiración\n• Guía silenciosa\n• Sincronicidad\n\n### Un Mundo Ecológico y Ético\n\nEl mundo-otro es a la vez:\n\n• **Ecológico**: Cada acción tiene una resonancia en el conjunto\n• **Ético**: La calidad de la relación importa\n\nNo es un espacio neutral donde se "obtienen poderes" — es un **tejido vivo** donde cada gesto crea consecuencias.\n\n### Ley Fundamental\n\n**La reciprocidad es la ley fundamental del mundo-otro.**\n\nNo se puede solo **tomar** — hay que **dar**.\n\nNo se puede solo **pedir** — hay que **escuchar**.\n\nLa violación de la reciprocidad genera:\n• Desequilibrio\n• Enfermedad\n• Pérdida de aliados\n• Ataque de fuerzas contrariadas'
      },
      {
        id: 's25',
        title: 'PRÁCTICA: Navegación en el Mundo-Otro',
        content: '### Ejercicio de Viaje Chamánico Básico\n\n**Advertencia**: Este es un ejercicio introductorio. Para viajes profundos, busca la guía de un maestro experimentado.\n\n**Preparación** (1 semana antes):\n\n1. **Dieta Suave**:\n   • Reduce sal, azúcar, carne roja\n   • Aumenta alimentos frescos y ligeros\n   • Ayuna 6 horas antes de la práctica\n\n2. **Intención Clara**:\n   • Escribe: "¿Qué necesito aprender del mundo-otro?"\n   • Lleva esta pregunta en tu corazón\n\n**Fase 1 - Creación del Espacio** (20 minutos):\n\n1. Prepara un espacio tranquilo y oscuro\n2. Enciende una vela e incienso (copal, palo santo)\n3. Delimita un círculo con piedras o tela\n4. Invoca protección:\n   *"Llamo a mis aliados del mundo invisible. Que solo aquello que es para mi mayor bien pueda entrar en este espacio."*\n\n**Fase 2 - Inducción** (15 minutos):\n\n1. Acuéstate cómodamente\n2. Cubre tus ojos con una tela\n3. Comienza a tamborear (o usa grabación de tambor chamánico a 4-7 Hz)\n4. Respira profundamente, relajando cada parte del cuerpo\n\n**Fase 3 - Portal** (5 minutos):\n\n1. Visualiza un portal en la tierra (cueva, raíz de árbol, pozo)\n2. O un portal hacia el cielo (montaña, escalera de luz, árbol gigante)\n3. **Siente** la textura de este portal\n4. Pide permiso para atravesarlo\n\n**Fase 4 - Travesía** (20-30 minutos):\n\n1. **Atraviesa** el portal con tu cuerpo de energía\n2. **Observa** sin juzgar lo que aparece\n3. **Busca** un aliado (animal, planta, ser de luz)\n4. **Pregunta**: "¿Tienes un mensaje para mí?"\n5. **Escucha** con todo tu ser\n6. **Agradece** cualquier encuentro\n\n**Fase 5 - Retorno** (10 minutos):\n\n1. Cuando sientas que es tiempo, regresa por el mismo portal\n2. Siente tu cuerpo físico\n3. Mueve lentamente dedos y pies\n4. Abre los ojos gradualmente\n\n**Fase 6 - Integración**:\n\nRegistra inmediatamente:\n\n• ¿Qué viste, sentiste, escuchaste?\n• ¿Qué aliado encontraste?\n• ¿Qué mensaje recibiste?\n• ¿Qué sensaciones quedaron en tu cuerpo?\n• ¿Qué comprensión nueva surge?\n\n**Fase 7 - Cierre**:\n\n1. Agradece a los aliados\n2. Cierra el círculo\n3. Come algo ligero (fruta, té)\n4. Descansa\n\n### Señales de que Navegas Auténticamente\n\n✅ Sensaciones corporales intensas\n✅ Información que no conocías conscientemente\n✅ Enseñanzas prácticas aplicables\n✅ Sensación de encuentro genuino, no de fantasía\n✅ Efectos duraderos en tu vida\n\n### Precauciones\n\n⚠️ Si sientes miedo intenso, regresa inmediatamente\n⚠️ No negocies con entidades que te pidan sacrificios peligrosos\n⚠️ Siempre cierra la sesión apropiadamente\n⚠️ Integra las enseñanzas en tu vida diaria'
      }
    ]
  },
  {
    id: '6',
    title: 'La Creencia como Operador de Realidad',
    description: 'Lenguaje, percepción y sintonización: cómo la creencia estructura el mundo vivido',
    sections: [
      {
        id: 's26',
        title: 'La Lengua Configura la Percepción',
        content: 'Cada lengua hace más que transmitir información. **Regula sutilmente aquello a lo que prestamos atención**. Las categorías gramaticales, las maneras de contar, de describir o de nombrar **orientan la mirada y moldean la experiencia**.\n\n### El Pluriel y la Sustancia\n\nCuando una lengua impone marcar el plural (francés, español, inglés), atrae la atención sobre los objetos como **unidades separadas**. Se cuentan cosas distintas, se notan sus contornos.\n\nOtras lenguas, como el yucateco, no obligan a señalar el plural: para contar, utilizan **clasificadores** que ponen énfasis en la **materia** de la cual la cosa está hecha.\n\n**Resultado**: No es la forma la que importa, sino la sustancia, la textura, la continuidad.\n\n### Espacio Absoluto vs Egocéntrico\n\n**Lenguas con referencias absolutas** (norte/sur/este/oeste):\n• Anclan la orientación en el cosmos\n• Desarrollan sentido de dirección constante\n• El cuerpo está siempre situado cósmicamente\n\n**Lenguas con referencias egocéntricas** (izquierda/derecha):\n• La orientación cambia con el cuerpo\n• El espacio es relativo al observador\n• Mayor flexibilidad, menor anclaje cósmico\n\n### Tiempo Lineal vs Circular\n\n**Linealización espacial variable:**\n\n• Izquierda→derecha (occidental)\n• Alto→bajo (chino tradicional)\n• Pasado delante/futuro detrás (aymara)\n• Efectos sobre ordenamiento y juicios temporales\n\n### Agentividad y Responsabilidad\n\n**"Se cayó el vaso"** (español, impersonal)\n• Reduce la atribución de responsabilidad\n• El evento "ocurrió"\n\n**"Él quebró el vaso"** (inglés, activo)\n• Énfasis en el agente\n• Mayor atribución de culpa\n\n### Conclusión Fundamental\n\n**La lengua no determina la pensée, pero orienta la atención, la memoria y la inferencia.**\n\nHace sobresalir ciertas propiedades del mundo y vuelve otras menos visibles.\n\nEsta orientación, repetida a gran escala, **moldea visiones de lo real**.'
      },
      {
        id: 's27',
        title: 'La Creencia Estructura el Mundo Vivido',
        content: 'La creencia estructura la percepción del real proveyendo **marcos de coherencia invisibles** que orientan la atención, interpretan los fenómenos y filtran lo que es percibido como "real", "posible" o "imposible".\n\n### Mecanismo Perceptivo\n\nLa percepción nunca es bruta. Está filtrada por **esquemas de expectativa** y representaciones previas.\n\n**La creencia actúa como un sistema de anticipación:**\n\n• Selecciona los estímulos\n• Organiza según un horizonte de sentido ya admitido\n• **No se ve lo que no se cree posible ver**\n\nEsto es estudiado en:\n• Psicología cognitiva (efecto de procesamiento top-down)\n• Antropología (construcción social de la realidad)\n\n### Efecto sobre el Mundo Vivido\n\nLas creencias colectivas estabilizan **"mundos comunes"**.\n\nFijan referencias compartidas que permiten a los miembros de un grupo:\n\n• Coordinar sus acciones\n• Juzgar qué es verdadero, bueno o normal\n• Distinguir naturaleza de sobrenaturaleza\n• Categorizar viviente de no-viviente\n• Separar humano de no-humano\n\n**La creencia no es una simple opinión interior, sino una infraestructura ontológica.**\n\n### Dimensión Social y Cultural\n\nLas interacciones sociales se organizan alrededor de **creencias implícitas** (valores, mitos, instituciones).\n\nDeterminan:\n• Estatutos\n• Roles\n• Comportamientos legítimos\n\n**Ejemplo:**\n\n• Creer en el valor del dinero\n• Creer en la razón científica\n• Creer en el espíritu de los ancestros\n\n→ Cada creencia determina regímenes de intercambio, cuidado y autoridad diferentes.\n\n### La Creencia es Performativa\n\n**Crea la realidad social que supone.**\n\nComo escribe Durkheim:\n*"La sociedad es la fuente de toda categoría del pensamiento."*\n\n### Dinámica y Transformación\n\nLas creencias evolucionan cuando los marcos colectivos cambian:\n\n• Crisis\n• Innovaciones técnicas\n• Choques simbólicos\n\nLa mutación de las creencias redefine entonces **lo que es percibido y pensado**:\n\n• La invención del microscopio → desplazó las creencias sobre lo viviente\n• Internet → transforma las creencias sobre verdad y comunidad'
      },
      {
        id: 's28',
        title: 'Sintonización Perceptiva y Energía',
        content: 'En el metachamanismo, la creencia no es concebida como una adhesión intelectual a una proposición, sino como una **fuerza organizadora del campo de percepción**.\n\n### Creencia como Sintonización\n\nCada ser percibe a través de un cierto **ajuste de sensibilidad**. Este ajuste depende de creencias profundas, a menudo inconscientes, que determinan el umbral de:\n\n• Lo visible\n• Lo audible\n• Lo pensable\n\nEn el chamanismo, estas creencias son vividas como **acordes vibratorios**: fijan la textura del mundo que se habita.\n\n**Cambiar de creencia = cambiar de sintonización = religar a otro plano de lo real.**\n\n### Creencia, Energía y Atención\n\nLa creencia orienta el **flujo de la energía psíquica**.\n\n**Aquello en lo que se cree recibe nuestra fuerza vital y la devuelve amplificada.**\n\nEn las cosmologías chamánicas, esto se traduce por la convicción de que:\n\n*"El espíritu responde al llamado"*\n\nLo que la consciencia tiene por verdadero se vuelve **operante**, porque la creencia alinea:\n\n• La atención\n• La emoción\n• La voluntad\n\n**En una misma dirección.**\n\n### El Espíritu Actúa donde la Creencia Concentra la Energía\n\nEste principio explica:\n\n• Por qué los rituales funcionan cuando hay fe\n• Por qué el placebo tiene efectos reales\n• Por qué diferentes tradiciones producen resultados similares\n• Por qué el escepticismo bloquea ciertas experiencias\n\n### Plasticidad del Mundo\n\nEn un paradigma metachamánico, **el mundo no está fijado sino que es plástico**.\n\nSe modula según los regímenes de consciencia que lo atraviesan.\n\n**La creencia no es ilusión, sino tecnología de manifestación.**\n\nConfigura la realidad vivida por **interacción recíproca** entre:\n\n• El humano\n• Las fuerzas del viviente\n\n### Discernimiento Necesario\n\nDe ahí la necesidad de un discernimiento riguroso:\n\n**Distinguir:**\n• Creencias que cierran el campo de lo real\n• Creencias que lo abren\n\n**No todas las creencias son igualmente fértiles o liberadoras.**'
      },
      {
        id: 's29',
        title: 'Función Ritual y Transmutación',
        content: 'El ritual sirve para **remodelar las creencias implícitas** llevándolas a la consciencia.\n\n### El Ritual como Tecnología de Transformación\n\nEl ritual no es un acto simbólico vacío. Es una **tecnología precisa** que opera en varios niveles:\n\n**1. Nivel Sensorial**\n• Moviliza todos los sentidos\n• Crea una experiencia total\n• Marca el cuerpo con memorias\n\n**2. Nivel Emocional**\n• Genera estados intensos\n• Libera bloqueos\n• Abre el corazón\n\n**3. Nivel Cognitivo**\n• Introduce nuevos marcos de comprensión\n• Desestabiliza certezas\n• Permite reorganización conceptual\n\n**4. Nivel Energético**\n• Moviliza fuerzas invisibles\n• Crea campos de resonancia\n• Transmuta frecuencias\n\n### Fases del Ritual Transformador\n\n**Fase 1: Separación**\n• Salir del espacio-tiempo ordinario\n• Marcar un umbral\n• Dejar atrás la identidad cotidiana\n\n**Fase 2: Liminal (Victor Turner)**\n• Estado de "entre-dos"\n• Máxima maleabilidad\n• Contacto con lo sagrado\n• Apertura a lo desconocido\n\n**Fase 3: Incorporación**\n• Retorno transformado\n• Integración de lo aprendido\n• Nueva identidad estabilizada\n\n### El Ritual Remodela la Creencia Mediante:\n\n**1. Experiencia Directa**\n\nNo se "aprende sobre" — se **vive**.\nLa certeza nace de la experiencia, no del dogma.\n\n**2. Repetición Consagrada**\n\nCada repetición profundiza el surco.\nLa nueva creencia se ancla en el cuerpo.\n\n**3. Testimonio Colectivo**\n\nLa comunidad valida la experiencia.\nLo vivido no es "solo mío" — es compartido.\n\n**4. Marcadores Corporales**\n\nEl cuerpo recuerda:\n• El aroma del sahumerio\n• El ritmo del tambor\n• El sabor de la medicina\n• La sensación del trance\n\n### Ejemplo de Transmutación\n\n**Creencia antigua**: "Estoy separado de la naturaleza."\n\n**Ritual de reconexión**:\n1. Ayuno de 3 días\n2. Ceremonia nocturna en el bosque\n3. Ingesta de planta maestra\n4. Visión de unidad con todos los seres\n5. Experiencia corporal de interconexión\n\n**Nueva creencia**: "Soy parte del tejido viviente. Mi respiración es la respiración del bosque."\n\nEsta nueva creencia no es solo mental — está **inscrita en el cuerpo**, validada por la **experiencia directa**, reforzada por el **marco ritual**.'
      },
      {
        id: 's30',
        title: 'PRÁCTICA: Ritual de Transmutación de Creencias',
        content: '### Ejercicio de Reconfiguración Consciente\n\n**Objetivo**: Transmutar una creencia limitante en una creencia expansiva a través de un ritual personal.\n\n**Preparación** (1 semana):\n\n1. **Identificar la Creencia Limitante**\n\nEscribe:\n• ¿Qué creencia sobre ti mismo o el mundo te limita?\n• Ejemplos:\n  - "No soy suficientemente fuerte"\n  - "El mundo es peligroso"\n  - "No merezco amor"\n  - "Lo invisible no es real"\n\n2. **Formular la Creencia Expansiva**\n\nTransforma la creencia en su opuesto vital:\n• "Tengo toda la fuerza que necesito"\n• "El mundo es un lugar de encuentro"\n• "Soy digno de amor profundo"\n• "Lo invisible es tan real como lo visible"\n\n**Fase 1 - Preparación del Espacio** (día del ritual):\n\n1. Limpia físicamente tu espacio\n2. Sahúma con palo santo o copal\n3. Crea un altar con:\n   • Representación de la vieja creencia (papel, objeto)\n   • Representación de la nueva creencia (semilla, cristal)\n   • Elemento de transformación (fuego, agua, tierra)\n\n**Fase 2 - Apertura** (10 minutos):\n\n1. Enciende una vela\n2. Invoca a tus aliados:\n   *"Llamo a todas las fuerzas que apoyan mi transformación. Que este ritual sea sagrado y efectivo."*\n3. Toca un instrumento (tambor, campana) para marcar el inicio\n\n**Fase 3 - Reconocimiento** (15 minutos):\n\n1. **Honra la vieja creencia**\n   • Agradécele por haberte protegido\n   • Reconoce que tuvo su función\n   • Escribe: "Gracias por [lo que te dio]. Ya no te necesito."\n\n2. **Siente en tu cuerpo dónde vive esta creencia**\n   • ¿En qué parte de tu cuerpo la sientes?\n   • ¿Qué textura, color, temperatura tiene?\n   • Respira hacia ese lugar\n\n**Fase 4 - Liberación** (10 minutos):\n\n1. **Declara en voz alta**:\n   *"Libero la creencia de [vieja creencia]. La devuelvo a la tierra/fuego/agua con gratitud."*\n\n2. **Acción física**:\n   • Quema el papel en el fuego, O\n   • Entierra el objeto en la tierra, O\n   • Suelta el objeto en agua corriente\n\n3. **Movimiento corporal**:\n   • Sacude todo tu cuerpo vigorosamente\n   • Grita si es necesario\n   • Expulsa la energía de la vieja creencia\n\n**Fase 5 - Incorporación** (20 minutos):\n\n1. **Invoca la nueva creencia**:\n   • Toma la semilla/cristal en tus manos\n   • Cierra los ojos\n   • Visualiza la nueva creencia como luz dorada\n\n2. **Respiración de incorporación**:\n   • Inhala: La nueva creencia entra\n   • Retén: Se instala en tus células\n   • Exhala: Libera cualquier resistencia\n   • Repite 21 veces\n\n3. **Declaración corporal**:\n   • De pie, con poder\n   • Declara la nueva creencia 7 veces en voz alta\n   • Con cada declaración, más fuerte\n   • Siente cómo vibra en tu cuerpo\n\n4. **Anclaje sensorial**:\n   • Toca tu corazón\n   • Siente la nueva creencia ahí\n   • Asocia un gesto o movimiento a esta creencia\n   • Este será tu "ancla" para reactivarla\n\n**Fase 6 - Cierre** (10 minutos):\n\n1. **Agradecimiento**:\n   *"Agradezco a todas las fuerzas que han apoyado esta transformación. Que esta nueva creencia florezca en mi vida."*\n\n2. **Sella el ritual**:\n   • Toca instrumento tres veces\n   • Apaga la vela\n   • Planta la semilla en la tierra (literal o simbólicamente)\n\n3. **Registro**:\n   • Escribe la experiencia inmediatamente\n   • ¿Qué sentiste?\n   • ¿Qué cambió?\n\n**Integración (21 días siguientes)**:\n\n**Cada mañana**:\n1. Repite la declaración de la nueva creencia\n2. Haz el gesto de anclaje\n3. Respira la creencia 7 veces\n\n**Observa**:\n• ¿Cómo cambia tu percepción del mundo?\n• ¿Qué oportunidades nuevas aparecen?\n• ¿Cómo responden las personas a ti?\n• ¿Qué sincronicidades ocurren?\n\n**Si la vieja creencia resurge**:\n1. No la juzgues\n2. Agradécele por visitarte\n3. Reafirma conscientemente la nueva creencia\n4. Repite el gesto de anclaje\n\n### Señales de Transmutación Exitosa\n\n✅ Cambios concretos en tu vida\n✅ Nuevas oportunidades que surgen\n✅ Sensación de ligereza y posibilidad\n✅ Confirmaciones externas (sincronicidades)\n✅ La nueva creencia se siente "natural"\n\n### Recordatorio Final\n\n**Las creencias son herramientas, no prisiones.**\n\nPuedes elegir conscientemente qué creer.\n\n**El ritual te da el poder de reescribir tu realidad desde la raíz.**'
      }
    ]
  }
]

function App() {
  const [chapters, setChapters] = useState(() => {
    const saved = localStorage.getItem('seminario-chapters')
    return saved ? JSON.parse(saved) : INITIAL_CHAPTERS
  })
  const [activeChapterId, setActiveChapterId] = useState(chapters[0]?.id)
  const [showPreview, setShowPreview] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [showAIAssistant, setShowAIAssistant] = useState(false)

  // Guardado automático
  useEffect(() => {
    localStorage.setItem('seminario-chapters', JSON.stringify(chapters))
  }, [chapters])

  const activeChapter = chapters.find(ch => ch.id === activeChapterId)

  const addChapter = () => {
    const newChapter = {
      id: Date.now().toString(),
      title: 'Nuevo Capítulo',
      description: '',
      sections: []
    }
    setChapters([...chapters, newChapter])
    setActiveChapterId(newChapter.id)
  }

  const updateChapter = (id, updates) => {
    setChapters(chapters.map(ch =>
      ch.id === id ? { ...ch, ...updates } : ch
    ))
  }

  const deleteChapter = (id) => {
    if (chapters.length === 1) {
      alert('Debe haber al menos un capítulo')
      return
    }
    if (confirm('¿Seguro que quieres eliminar este capítulo?')) {
      const newChapters = chapters.filter(ch => ch.id !== id)
      setChapters(newChapters)
      if (activeChapterId === id) {
        setActiveChapterId(newChapters[0].id)
      }
    }
  }

  const reorderChapters = (startIndex, endIndex) => {
    const result = Array.from(chapters)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    setChapters(result)
  }

  const addSection = (chapterId) => {
    const chapter = chapters.find(ch => ch.id === chapterId)
    const newSection = {
      id: Date.now().toString(),
      title: 'Nueva Sección',
      content: ''
    }
    updateChapter(chapterId, {
      sections: [...chapter.sections, newSection]
    })
  }

  const updateSection = (chapterId, sectionId, updates) => {
    const chapter = chapters.find(ch => ch.id === chapterId)
    const newSections = chapter.sections.map(s =>
      s.id === sectionId ? { ...s, ...updates } : s
    )
    updateChapter(chapterId, { sections: newSections })
  }

  const deleteSection = (chapterId, sectionId) => {
    const chapter = chapters.find(ch => ch.id === chapterId)
    const newSections = chapter.sections.filter(s => s.id !== sectionId)
    updateChapter(chapterId, { sections: newSections })
  }

  const exportToJSON = () => {
    const dataStr = JSON.stringify(chapters, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = 'seminario-metachamanismo.json'

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const resetToInitial = () => {
    if (confirm('¿Seguro que quieres restaurar los capítulos iniciales? Se perderán todos los cambios actuales.')) {
      localStorage.removeItem('seminario-chapters')
      setChapters(INITIAL_CHAPTERS)
      setActiveChapterId(INITIAL_CHAPTERS[0].id)
    }
  }

  const importFromText = (text) => {
    // Esta función será llamada desde ImportModal
    const lines = text.split('\n').filter(line => line.trim())
    const newChapters = []
    let currentChapter = null
    let currentSection = null

    lines.forEach(line => {
      const trimmed = line.trim()

      // Detectar capítulos (líneas con "Capítulo" o que empiecen con número seguido de punto)
      if (trimmed.match(/^(Capítulo|CAPÍTULO|\d+\.)/i)) {
        if (currentChapter) {
          newChapters.push(currentChapter)
        }
        currentChapter = {
          id: Date.now().toString() + Math.random(),
          title: trimmed.replace(/^(Capítulo|CAPÍTULO|\d+\.)\s*/i, ''),
          description: '',
          sections: []
        }
        currentSection = null
      }
      // Detectar secciones (líneas que empiezan con - o •)
      else if (trimmed.match(/^[-•*]/)) {
        if (currentChapter) {
          currentSection = {
            id: Date.now().toString() + Math.random(),
            title: trimmed.replace(/^[-•*]\s*/, ''),
            content: ''
          }
          currentChapter.sections.push(currentSection)
        }
      }
      // Contenido de sección
      else if (currentSection) {
        currentSection.content += (currentSection.content ? '\n' : '') + trimmed
      }
      // Descripción de capítulo
      else if (currentChapter && trimmed) {
        currentChapter.description += (currentChapter.description ? '\n' : '') + trimmed
      }
    })

    if (currentChapter) {
      newChapters.push(currentChapter)
    }

    if (newChapters.length > 0) {
      setChapters(newChapters)
      setActiveChapterId(newChapters[0].id)
      setShowImport(false)
    }
  }

  const handleAddChaptersFromAI = (newChapters) => {
    setChapters([...chapters, ...newChapters])
    if (newChapters.length > 0) {
      setActiveChapterId(newChapters[0].id)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📿 Editor de Seminario: Meta-Chamanismo</h1>
        <div className="header-actions">
          <button
            onClick={() => setShowAIAssistant(!showAIAssistant)}
            className={showAIAssistant ? "btn-primary" : "btn-secondary"}
          >
            🤖 {showAIAssistant ? 'Ocultar' : 'Mostrar'} Asistente IA
          </button>
          <button onClick={resetToInitial} className="btn-secondary">
            🔄 Restaurar Inicial
          </button>
          <button onClick={() => setShowImport(true)} className="btn-secondary">
            📥 Importar Texto
          </button>
          <button onClick={exportToJSON} className="btn-secondary">
            💾 Exportar JSON
          </button>
          <button onClick={() => setShowPreview(true)} className="btn-primary">
            👁️ Vista Previa
          </button>
        </div>
      </header>

      <div className={`app-content ${showAIAssistant ? 'with-ai-assistant' : ''}`}>
        <ChapterList
          chapters={chapters}
          activeChapterId={activeChapterId}
          onSelectChapter={setActiveChapterId}
          onAddChapter={addChapter}
          onDeleteChapter={deleteChapter}
          onReorderChapters={reorderChapters}
        />

        {activeChapter && (
          <ChapterEditor
            chapter={activeChapter}
            onUpdateChapter={updateChapter}
            onAddSection={addSection}
            onUpdateSection={updateSection}
            onDeleteSection={deleteSection}
          />
        )}

        {showAIAssistant && (
          <AsistenteIA
            onAddChapters={handleAddChaptersFromAI}
            onUpdateContent={updateChapter}
            activeChapterId={activeChapterId}
          />
        )}
      </div>

      {showPreview && (
        <PreviewModal
          chapters={chapters}
          onClose={() => setShowPreview(false)}
        />
      )}

      {showImport && (
        <ImportModal
          onImport={importFromText}
          onClose={() => setShowImport(false)}
        />
      )}
    </div>
  )
}

export default App
