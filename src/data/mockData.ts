import { Lesson, StudentCohort, Badge, SyncQueueItem, DailyQuest } from '../types';

export const mockLessons: Lesson[] = [
  {
    id: 'ncert-cell-structure',
    grade: {
      en: 'NCERT Grade 8 Science',
      hi: 'NCERT कक्षा 8 विज्ञान',
      mr: 'NCERT इयत्ता 8 वी विज्ञान',
      ta: 'NCERT வகுப்பு 8 அறிவியல்',
      te: 'NCERT క్లాస్ 8 సైన్స్',
    },
    title: {
      en: 'Cell: Structure and Functions',
      hi: 'कोशिका: संरचना एवं प्रकार्य (Cell Structure)',
      mr: 'पेशी: रचना आणि कार्ये',
      ta: 'செல்: அமைப்பு மற்றும் பணிகள்',
      te: 'కణం: నిర్మాణం మరియు విధులు',
    },
    subtitle: {
      en: 'The Cell Wall and Membrane',
      hi: 'कोशिका भित्ति एवं कोशिका झिल्ली',
      mr: 'पेशी भिंत आणि पेशी पटलाची रचना',
      ta: 'செல் சுவர் மற்றும் சவ்வு',
      te: 'కణ గోడ మరియు కణ పొర',
    },
    duration: '08:45',
    mediaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCv76_CuvsZQyJXEuSaqpJtaUPmB14o7V0jVXXDte7HHjXT1G0b51AOrBLtjyKS7dSdil5CRtjEGDcz4C1O8c7VKpv8tJue36H_08aE0yln3Aj4ebgvjVxIiS5nEsOSl1qW1QoKPD-yl-PqtClxD16PiAaY3gRJSggDrUHQIyaOV-UkIrId5v4me_kXJv3hGZrUYQmmhFCjeqwAYWMjheFXvqaZn9WdLS0J_yU9z29lJ4uKNrg9d3AS',
    mediaAlt: 'Educational diagram of a plant cell with Hindi and English labels showing Nucleus, Cell Wall, Cell Membrane, Chloroplast, Mitochondria, and Vacuole.',
    hasCC: true,
    difficultyLevel: 2,
    transcript: {
      en: [
        'Just like a house has walls to protect it, plant cells have a rigid outer layer called the cell wall (कोशिका भित्ति). This is unique to plant cells and gives them structure, which is why a mango tree stands tall.',
        'Inside the cell wall is the cell membrane (कोशिका झिल्ली). Think of it like the security guard at your school gate—it decides what enters and leaves the cell. Animal cells only have this membrane, not the outer wall.'
      ],
      hi: [
        'जिस प्रकार एक घर को सुरक्षा प्रदान करने के लिए दीवारें होती हैं, उसी प्रकार पादप कोशिकाओं (Plant Cells) में एक सख्त बाहरी परत होती है जिसे कोशिका भित्ति (Cell Wall) कहा जाता है। यह पादप कोशिकाओं के लिए विशेष है और उन्हें संरचना प्रदान करती है, जिससे आम का पेड़ सीधा खड़ा रहता है।',
        'कोशिका भित्ति के अंदर कोशिका झिल्ली (Cell Membrane) होती है। इसे अपने स्कूल के गेट के सुरक्षा गार्ड की तरह समझें - यह तय करती है कि कोशिका में क्या प्रवेश करेगा और क्या बाहर निकलेगा। जंतु कोशिकाओं में केवल यह झिल्ली होती है, बाहरी भित्ति नहीं।'
      ],
      mr: [
        'जसे घराचे रक्षण करण्यासाठी भिंती असतात, तद्वतच वनस्पती पेशींमध्ये पेशी भिंत (Cell Wall) नावाचा घट्ट बाह्य थर असतो. हा वनस्पती पेशींसाठी विशेष असतो आणि त्यांना आकार देतो, ज्यामुळे आंब्याचे झाड उंच उभे राहू शकते.',
        'पेशी भिंतीच्या आत पेशी पटल (Cell Membrane) असते. शाळेच्या गेटवरील सुरक्षारक्षकाप्रमाणे ते काम करते - पेशीमध्ये काय यावे आणि काय बाहेर जावे हे ते ठरवते. प्राण्यांच्या पेशींमध्ये फक्त हे पटल असते, बाह्य भिंत नसते.'
      ],
      ta: [
        'ஒரு வீட்டிற்கு பாதுகாப்பு வழங்க சுவர்கள் இருப்பது போல், தாவர செல்களில் செல் சுவர் (Cell Wall) எனப்படும் கடுமையான வெளிப்புற அடுக்கு உள்ளது. இது தாவர செல்கள் நிமிர்ந்து நிற்க உதவுகிறது.',
        'செல் சுவருக்கு உள்ளே செல் சவ்வு (Cell Membrane) உள்ளது. இது பள்ளியின் பாதுகாப்பு காவலர் போன்றது - செல்லுக்குள் என்ன நுழைய வேண்டும், எது வெளியேற வேண்டும் என்பதை இது தீர்மானிக்கிறது.'
      ],
      te: [
        'ఒక ఇంటిని రక్షించడానికి గోడలు ఉన్నట్లే, మొక్కల కణాలలో కణ గోడ (Cell Wall) అని పిలిచే దృఢమైన బయటి పొర ఉంటుంది. ఇది మొక్కల కణాలకు మాత్రమే ప్రత్యేకమైనది మరియు వాటికి ఆకారాన్ని ఇస్తుంది.',
        'కణ గోడ లోపల కణ పొర (Cell Membrane) ఉంటుంది. ఇది కణంలోకి ఏమి ప్రవేశించాలో మరియు ఏమి బయటకు వెళ్ళాలో నిర్ణయిస్తుంది.'
      ]
    },
    quizQuestions: [
      {
        id: 'q1',
        text: {
          en: 'Why do plant cells, like those in a neem tree leaf, have a cell wall while human cheek cells do not?',
          hi: 'नीम के पेड़ की पत्ती की तरह पादप कोशिकाओं में कोशिका भित्ति क्यों होती है जबकि मानव गाल की कोशिकाओं में नहीं?',
          mr: 'कडुनिंबाच्या पानावरील पेशींमध्ये पेशी भिंत का असते, तर मानवी गालाच्या पेशींमध्ये ती का नसते?',
          ta: 'வேப்ப மர இலையின் தாவர செல்களில் செல் சுவர் ஏன் உள்ளது, ஆனால் மனித கன்னச் செல்களில் இல்லை?',
          te: 'వేప చెట్టు ఆకులోని కణాలలో కణ గోడ ఎందుకు ఉంటుంది, కానీ మానవ చెంప కణాలలో ఎందుకు ఉండదు?'
        },
        options: {
          en: [
            'A. Plants need extra protection and structure against weather.',
            'B. The cell wall helps plants move around freely.',
            'C. Animal cells have a stronger nucleus instead.',
            'D. Plants do not have a cell membrane at all.'
          ],
          hi: [
            'A. पौधों को मौसम और हवा से अतिरिक्त सुरक्षा और संरचनात्मक मजबूती की आवश्यकता होती है।',
            'B. कोशिका भित्ति पौधों को स्वतंत्र रूप से चलने में मदद करती है।',
            'C. इसके बजाय जंतु कोशिकाओं में अधिक मजबूत केंद्रक होता है।',
            'D. पौधों में कोशिका झिल्ली बिल्कुल नहीं होती।'
          ],
          mr: [
            'A. वनस्पतींना हवामानापासून अतिरिक्त संरक्षण आणि संरचनेची गरज असते.',
            'B. पेशी भिंत वनस्पतींना फिरण्यास मदत करते.',
            'C. प्राण्यांच्या पेशींमध्ये मजबूत केंद्रक असतो.',
            'D. वनस्पतींमध्ये पेशी पटल नसते.'
          ],
          ta: [
            'A. தாவரங்களுக்கு வானிலை மற்றும் காற்றிலிருந்து கூடுதல் பாதுகாப்பும் அமைப்பும் தேவை.',
            'B. செல் சுவர் தாவரங்கள் நகர உதவுகிறது.',
            'C. விலங்கு செல்களில் வலுவான உட்கரு உள்ளது.',
            'D. தாவரங்களுக்கு செல் சவ்வு இல்லை.'
          ],
          te: [
            'A. మొక్కలకు వాతావరణం నుండి అదనపు రక్షణ మరియు నిర్మాణ బలం అవసరం.',
            'B. కణ గోడ మొక్కలు కదలడానికి సహాయపడుతుంది.',
            'C. జంతువుల కణాలలో బలమైన కేంద్రకం ఉంటుంది.',
            'D. మొక్కలకు కణ పొర ఉండదు.'
          ]
        },
        correctAnswerIndex: 0,
        explanation: {
          en: 'Plant cells require cell walls for structural rigidity and protection against harsh environmental exposure (wind, rain, temperature).',
          hi: 'पादप कोशिकाओं को कठोरता और कठोर पर्यावरणीय परिस्थितियों (हवा, बारिश, तापमान) से सुरक्षा के लिए कोशिका भित्ति की आवश्यकता होती है।',
          mr: 'वनस्पतींच्या पेशींना कडकपणा आणि तीव्र हवामानापासून संरक्षणासाठी पेशी भिंतीची गरज असते.',
          ta: 'தாவர செல்களுக்கு கட்டமைப்பு விறைப்புத்தன்மையும் கடுமையான வானிலையிலிருந்து பாதுகாப்பும் தேவை.',
          te: 'మొక్కల కణాలకు దృఢత్వం మరియు కఠినమైన వాతావరణం నుండి రక్షణ కోసం కణ గోడ అవసరం.'
        }
      },
      {
        id: 'q2',
        text: {
          en: 'Which component controls what substances enter and exit both plant and animal cells?',
          hi: 'पादप और जंतु दोनों कोशिकाओं में कौन सा घटक पदार्थों के आने-जाने को नियंत्रित करता है?',
          mr: 'वनस्पती आणि प्राणी दोन्ही पेशींमध्ये कोणत्या घटकाद्वारे पदार्थांचे येणे-जाणे नियंत्रित केले जाते?',
          ta: 'தாவர மற்றும் விலங்கு செல்களுக்குள் பொருட்கள் நுழைவதையும் வெளியேறுவதையும் எது கட்டுப்படுத்துகிறது?',
          te: 'మొక్కలు మరియు జంతువుల కణాలలో పదార్థాల ప్రవేశాన్ని మరియు నిష్క్రమణను ఏది నియంత్రిస్తుంది?'
        },
        options: {
          en: [
            'A. Chloroplast (हरित लवक)',
            'B. Cell Membrane (कोशिका झिल्ली)',
            'C. Vacuole (रसधानी)',
            'D. Cell Wall (कोशिका भित्ति)'
          ],
          hi: [
            'A. हरित लवक (Chloroplast)',
            'B. कोशिका झिल्ली (Cell Membrane)',
            'C. रसधानी (Vacuole)',
            'D. कोशिका भित्ति (Cell Wall)'
          ],
          mr: [
            'A. हरितलवक (Chloroplast)',
            'B. पेशी पटल (Cell Membrane)',
            'C. रिक्तिका (Vacuole)',
            'D. पेशी भिंत (Cell Wall)'
          ],
          ta: [
            'A. பசுங்கணிகம் (Chloroplast)',
            'B. செல் சவ்வு (Cell Membrane)',
            'C. வெற்றிடம் (Vacuole)',
            'D. செல் சுவர் (Cell Wall)'
          ],
          te: [
            'A. హరితరేణువు (Chloroplast)',
            'B. కణ పొర (Cell Membrane)',
            'C. రిక్తిక (Vacuole)',
            'D. కణ గోడ (Cell Wall)'
          ]
        },
        correctAnswerIndex: 1,
        explanation: {
          en: 'The cell membrane is selectively permeable and regulates the movement of substances in and out of all living cells.',
          hi: 'कोशिका झिल्ली चयनात्मक रूप से पारगम्य होती है और सभी जीवित कोशिकाओं में पदार्थों की आवाजाही को नियंत्रित करती है।',
          mr: 'पेशी पटल हे पदार्थांच्या वाहतुकीवर नियंत्रण ठेवते.',
          ta: 'செல் சவ்வு அனைத்து செல்கள் வழியாகவும் பொருட்களின் இயக்கத்தை ஒழுங்குபடுத்துகிறது.',
          te: 'కణ పొర పదార్థాల రవాణాను నియంత్రిస్తుంది.'
        }
      }
    ]
  },
  {
    id: 'grade5-ecosystems',
    grade: {
      en: 'Grade 5 Science',
      hi: 'कक्षा 5 विज्ञान',
      mr: 'इयत्ता 5 वी विज्ञान',
      ta: 'வகுப்பு 5 அறிவியல்',
      te: 'క్లాస్ 5 సైన్స్',
    },
    title: {
      en: 'Ecosystems & Energy Flow',
      hi: 'पारिस्थितिकी तंत्र और ऊर्जा प्रवाह',
      mr: 'पर्यावरण आणि ऊर्जा प्रवाह',
      ta: 'சுற்றுச்சூழல் & ஆற்றல் ஓட்டம்',
      te: 'పర్యావరణ వ్యవస్థ & శక్తి ప్రవాహం',
    },
    subtitle: {
      en: 'The Food Web in Forest Dynamics',
      hi: 'खाद्य जाल और वन ऊर्जा',
      mr: 'अन्न साखळी आणि ऊर्जा प्रवाह',
      ta: 'உணவு வலை மற்றும் ஆற்றல்',
      te: 'ఆహార జాలం మరియు శక్తి ప్రవాహం',
    },
    duration: '04:12',
    mediaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmVkUNiqcLSbdtV3fY9vFZhtFPzqYkujNbr3tKZQcgHPAOGuSL8jAh8zbLRxaVJeRKGnGRNHVoqcW64IQu4QxiWaDlahEJqijEZ8dOcYHJ_79TkdNZrG1tEaFGh1Nvo7TyoNbqX3gaC1sM6dbXn1gTVq8AvVXoWGImSYNHJcWz6X0fz2yZk8CyGkcmvHmnNAVHEYWM29s2-anMatOBANOJZep3rgBjcieh_o2MEkCPtPK-WskrdDWC',
    mediaAlt: 'Vibrant forest ecosystem diagram showing energy flowing from sun to plants, deer, and wolf.',
    hasCC: true,
    difficultyLevel: 1,
    transcript: {
      en: [
        'Energy in an ecosystem flows from the sun to producers, then to consumers. Plants capture solar energy through photosynthesis. When herbivores eat the plants, they absorb some of that energy.',
        'Notice how the arrow always points in the direction of energy flow. It shows where the energy is going, not who is doing the eating!'
      ],
      hi: [
        'एक पारिस्थितिकी तंत्र में ऊर्जा सूर्य से उत्पादकों (पौधों) तक और फिर उपभोक्ताओं तक बहती है। पौधे प्रकाश संश्लेषण के माध्यम से सौर ऊर्जा को अवशोषित करते हैं। जब शाकाहारी पौधे खाते हैं, तो वे उस ऊर्जा का कुछ भाग प्राप्त करते हैं।',
        'ध्यान दें कि तीर हमेशा ऊर्जा प्रवाह की दिशा में इशारा करता है। यह दिखाता है कि ऊर्जा कहाँ जा रही है!'
      ],
      mr: [
        'पर्यावरणात ऊर्जा सूर्याकडून वनस्पतींकडे आणि नंतर प्राण्यांकडे प्रवाहित होते.',
        'बाण नेहमी ऊर्जेचा प्रवाह ज्या दिशेने होतो ती दिशा दाखवतो.'
      ],
      ta: [
        'சுற்றுச்சூழலில் ஆற்றல் சூரியனில் இருந்து தாவரங்களுக்கும் பின்னர் விலங்குகளுக்கும் பாய்கிறது.',
        'அம்பு எப்போதும் ஆற்றல் பாயும் திசையைக் காட்டுகிறது.'
      ],
      te: [
        'పర్యావరణ వ్యవస్థలో శక్తి సూర్యుని నుండి మొక్కలకు, తరువాత జంతువులకు ప్రవహిస్తుంది.',
        'అ బాణం ఎల్లప్పుడూ శక్తి ప్రవాహ దిశను చూపిస్తుంది.'
      ]
    },
    quizQuestions: [
      {
        id: 'qe1',
        text: {
          en: 'If a disease wipes out the primary consumers in a food web, what is the most immediate effect on the producers?',
          hi: 'यदि एक बीमारी खाद्य जाल में प्राथमिक उपभोक्ताओं (शाकाहारी जीवों) को समाप्त कर देती है, तो उत्पादकों पर सबसे तत्काल प्रभाव क्या होगा?',
          mr: 'जर प्राथमिक ग्राहक (शाकाहारी प्राणी) आजाराने नष्ट झाले, तर वनस्पतींवर काय परिणाम होईल?',
          ta: 'உணவு வலையில் முதல் நிலை நுகர்வோர்கள் நோய்வாய்ப்பட்டு அழிந்தால், தாவரங்களுக்கு என்ன நிகழும்?',
          te: 'ఆహార జాలంలో ప్రాథమిక వినియోగదారులు నశిస్తే, మొక్కలపై తక్షణ ప్రభావం ఏమిటి?'
        },
        options: {
          en: [
            'A. They will decrease in number',
            'B. They will increase in number',
            'C. They will become carnivores',
            'D. There will be no change'
          ],
          hi: [
            'A. उनकी संख्या में कमी आएगी',
            'B. उनकी संख्या में वृद्धि होगी',
            'C. वे मांसाहारी बन जाएंगे',
            'D. कोई बदलाव नहीं होगा'
          ],
          mr: [
            'A. त्यांची संख्या कमी होईल',
            'B. त्यांची संख्या वाढेल',
            'C. त्या मांसभक्षी बनतील',
            'D. काहीही बदल होणार नाही'
          ],
          ta: [
            'A. அவற்றின் எண்ணிக்கை குறையும்',
            'B. அவற்றின் எண்ணிக்கை அதிகரிக்கும்',
            'C. அவை ஊனுண்ணிகளாக மாறும்',
            'D. மாற்றமும் இருக்காது'
          ],
          te: [
            'A. వాటి సంఖ్య తగ్గుతుంది',
            'B. వాటి సంఖ్య పెరుగుతుంది',
            'C. అవి మాంసాహారులుగా మారతాయి',
            'D. మార్పు ఉండదు'
          ]
        },
        correctAnswerIndex: 1,
        explanation: {
          en: 'Without herbivores eating them, plants (producers) experience decreased grazing pressure and temporary population increase.',
          hi: 'शाकाहारी जीवों द्वारा न खाए जाने के कारण, पौधों (उत्पादकों) की संख्या में अस्थायी रूप से वृद्धि होगी।',
          mr: 'शाकाहारी प्राणी नसल्यामुळे वनस्पतींची संख्या वाढेल.',
          ta: 'தாவரங்களை உண்ணும் விலங்குகள் இல்லாததால் தாவரங்களின் எண்ணிக்கை அதிகரிக்கும்.',
          te: 'శాకాహారులు లేకపోవడంతో మొక్కల సంఖ్య పెరుగుతుంది.'
        }
      }
    ]
  }
];

export const mockCohorts: StudentCohort[] = [
  {
    id: 'stu-8842',
    studentCode: 'STU-8842',
    name: 'Rajesh Kumar',
    riskLevel: 'HIGH RISK',
    irtAbility: -1.8,
    lastSync: '4 days ago',
    topicScores: [
      { topicName: 'Crop Production', score: 32, status: 'critical' },
      { topicName: 'Microorganisms', score: 40, status: 'critical' },
      { topicName: 'Coal & Petroleum', score: 55, status: 'basic' },
      { topicName: 'Cell Structure', score: 28, status: 'critical' },
      { topicName: 'Reproduction', score: 48, status: 'basic' },
      { topicName: 'Force & Pressure', score: 35, status: 'critical' },
    ]
  },
  {
    id: 'stu-8845',
    studentCode: 'STU-8845',
    name: 'Ananya Sharma',
    riskLevel: 'ON TRACK',
    irtAbility: 1.4,
    lastSync: '2 hours ago',
    topicScores: [
      { topicName: 'Crop Production', score: 88, status: 'proficient' },
      { topicName: 'Microorganisms', score: 82, status: 'proficient' },
      { topicName: 'Coal & Petroleum', score: 92, status: 'proficient' },
      { topicName: 'Cell Structure', score: 78, status: 'basic' },
      { topicName: 'Reproduction', score: 85, status: 'proficient' },
      { topicName: 'Force & Pressure', score: 90, status: 'proficient' },
    ]
  },
  {
    id: 'stu-8848',
    studentCode: 'STU-8848',
    name: 'Priya Patel',
    riskLevel: 'MONITOR',
    irtAbility: -0.2,
    lastSync: 'Yesterday',
    topicScores: [
      { topicName: 'Crop Production', score: 62, status: 'basic' },
      { topicName: 'Microorganisms', score: 58, status: 'basic' },
      { topicName: 'Coal & Petroleum', score: 75, status: 'proficient' },
      { topicName: 'Cell Structure', score: 80, status: 'proficient' },
      { topicName: 'Reproduction', score: 60, status: 'basic' },
      { topicName: 'Force & Pressure', score: 82, status: 'proficient' },
    ]
  },
  {
    id: 'stu-8850',
    studentCode: 'STU-8850',
    name: 'Rahul Gupta',
    riskLevel: 'ON TRACK',
    irtAbility: 1.8,
    lastSync: '1 hour ago',
    topicScores: [
      { topicName: 'Crop Production', score: 95, status: 'proficient' },
      { topicName: 'Microorganisms', score: 90, status: 'proficient' },
      { topicName: 'Coal & Petroleum', score: 88, status: 'proficient' },
      { topicName: 'Cell Structure', score: 96, status: 'proficient' },
      { topicName: 'Reproduction', score: 91, status: 'proficient' },
      { topicName: 'Force & Pressure', score: 94, status: 'proficient' },
    ]
  }
];

export const mockBadges: Badge[] = [
  {
    id: 'b1',
    title: {
      en: 'Cell Scholar',
      hi: 'सेल स्कॉलर',
      mr: 'पेशी तज्ज्ञ',
      ta: 'செல் அறிஞர்',
      te: 'కణ పండితుడు',
    },
    description: {
      en: 'Scored 100% on Cell Membrane & Cell Wall Assessment',
      hi: 'कोशिका झिल्ली और भित्ति आंकलन में 100% अंक प्राप्त किए',
      mr: 'पेशी पटल चाचणीत १००% गुण मिळवले',
      ta: 'செல் தேர்வில் 100% மதிப்பெண் பெற்றார்',
      te: 'కణ పరీక్షలో 100% సాధించారు',
    },
    icon: 'science',
    category: 'science',
    color: 'tertiary',
    unlocked: true,
    unlockedAt: 'Yesterday'
  },
  {
    id: 'b2',
    title: {
      en: 'NCERT Ace',
      hi: 'NCERT एस्',
      mr: 'NCERT गुणवंत',
      ta: 'NCERT சாம்பியன்',
      te: 'NCERT విజేత',
    },
    description: {
      en: 'Completed 5 consecutive NCERT Grade 8 Science modules',
      hi: 'लगातार 5 NCERT कक्षा 8 विज्ञान मॉड्यूल पूरे किए',
      mr: 'सलग ५ विज्ञान धडे पूर्ण केले',
      ta: 'தொடர்ந்து 5 பாடங்களை முடித்தார்',
      te: 'వరుసగా 5 పాఠాలు పూర్తి చేశారు',
    },
    icon: 'menu_book',
    category: 'quiz',
    color: 'primary',
    unlocked: true,
    unlockedAt: '3 days ago'
  },
  {
    id: 'b3',
    title: {
      en: 'Forest Explorer',
      hi: 'वन अन्वेषक',
      mr: 'जंगल शोधक',
      ta: 'காடு ஆராய்சி',
      te: 'అటవీ అన్వేషకుడు',
    },
    description: {
      en: 'Mastered Food Webs and Ecosystem Energy Flow',
      hi: 'खाद्य जाल और पारिस्थितिकी तंत्र ऊर्जा में महारत हासिल की',
      mr: 'अन्न साखळी आणि ऊर्जेचा अभ्यास पूर्ण केला',
      ta: 'உணவு வலை பாடத்தில் தேர்ச்சி பெற்றார்',
      te: 'ఆహార జాలంలో నైపుణ్యం సాధించారు',
    },
    icon: 'forest',
    category: 'science',
    color: 'tertiary',
    unlocked: true,
    unlockedAt: '1 week ago'
  },
  {
    id: 'b4',
    title: {
      en: 'Sync Master',
      hi: 'सिंक मास्टर',
      mr: 'सिंक मास्टर',
      ta: 'சிங்க் மாஸ்டர்',
      te: 'సింక్ మాస్టర్',
    },
    description: {
      en: 'Successfully synced 10 offline assessments without errors',
      hi: 'बिना किसी त्रुटि के 10 ऑफलाइन आंकलन सिंक किए',
      mr: '१० ऑफलाइन चाचण्या सिंक केल्या',
      ta: '10 ஆஃப்லைன் சோதனைகளை ஒத்திசைத்தார்',
      te: '10 ఆఫ్‌లైన్ పరీక్షలను సింక్ చేశారు',
    },
    icon: 'cloud_done',
    category: 'sync',
    color: 'secondary',
    unlocked: false
  }
];

export const mockSyncQueue: SyncQueueItem[] = [
  {
    id: 'sq1',
    type: 'quiz',
    title: {
      en: 'Quiz Results: Cell Structure',
      hi: 'क्विज परिणाम: कोशिका संरचना',
      mr: 'चाचणी निकाल: पेशी रचना',
      ta: 'தேர்வு முடிவுகள்: செல் அமைப்பு',
      te: 'పరీక్ష ఫలితాలు: కణ నిర్మాణం',
    },
    details: {
      en: 'Fractions & Decimals • 1.2 MB',
      hi: 'अंक एवं मूल्यांकन • 1.2 MB',
      mr: 'मूल्यांकन • 1.2 MB',
      ta: 'மதிப்பீடு • 1.2 MB',
      te: 'మదింపు • 1.2 MB',
    },
    size: '1.2 MB',
    status: 'pending',
    color: 'primary'
  },
  {
    id: 'sq2',
    type: 'video',
    title: {
      en: 'Video Progress: Plant Cell Lab',
      hi: 'वीडियो प्रगति: पादप कोशिका लैब',
      mr: 'व्हिडिओ प्रगती: वनस्पती पेशी',
      ta: 'வீடியோ முன்னேற்றம்: தாவர செல்',
      te: 'వీడియో పురోగతి: కణ ప్రయోగశాల',
    },
    details: {
      en: 'Photosynthesis & Membrane • 45 KB',
      hi: 'प्रकाश संश्लेषण एवं झिल्ली • 45 KB',
      mr: 'प्रकाशसंश्लेषण • 45 KB',
      ta: 'ஒளிச்சேர்க்கை • 45 KB',
      te: 'కిరణజన్య సంయోగక్రియ • 45 KB',
    },
    size: '45 KB',
    status: 'pending',
    color: 'tertiary'
  },
  {
    id: 'sq3',
    type: 'analytics',
    title: {
      en: 'Usage Analytics & XP Logs',
      hi: 'उपयोग विश्लेषण एवं XP लॉग',
      mr: 'वापर विश्लेषण',
      ta: 'பயன்பாட்டு பகுப்பாய்வு',
      te: 'వినియోగ అనలిటిక్స్',
    },
    details: {
      en: 'Weekly report • 12 KB',
      hi: 'साप्ताहिक रिपोर्ट • 12 KB',
      mr: 'साप्ताहिक अहवाल • 12 KB',
      ta: 'வாராந்திர அறிக்கை • 12 KB',
      te: 'వారం వారీ నివేదిక • 12 KB',
    },
    size: '12 KB',
    status: 'pending',
    color: 'outline'
  }
];

export const mockDailyQuests: DailyQuest[] = [
  {
    id: 'dq1',
    title: {
      en: 'Complete 1 Lesson',
      hi: '1 पाठ पूरा करें',
      mr: '१ धडा पूर्ण करा',
      ta: '1 பாடத்தை முடிக்கவும்',
      te: '1 పాఠం పూర్తి చేయండి',
    },
    xp: 50,
    completed: true
  },
  {
    id: 'dq2',
    title: {
      en: 'Score 80% on Quiz',
      hi: 'क्विज में 80% अंक प्राप्त करें',
      mr: 'चाचणीत ८०% गुण मिळवा',
      ta: 'தேர்வில் 80% மதிப்பெண் பெறவும்',
      te: 'పరీక్షలో 80% సాధించండి',
    },
    xp: 100,
    completed: false,
    progress: 1,
    maxProgress: 2
  },
  {
    id: 'dq3',
    title: {
      en: 'Review 3 Flashcards',
      hi: '3 फ्लैशकार्ड की समीक्षा करें',
      mr: '३ फ्लॅशकार्ड पुनरावलोकन करा',
      ta: '3 அட்டைப் பாடங்களை படிக்கவும்',
      te: '3 ఫ్లాష్‌కార్డ్‌లను సమీక్షించండి',
    },
    xp: 30,
    completed: false
  }
];
