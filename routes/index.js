var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Como falar muito sem dizer nada' });
});

router.get('/sentences', function(req, res) {
  const sentences = {
    firstColumn: [
      'Caros colegas,',
      'Por outro lado,',
      'Não podemos esquecer que',
      'Do mesmo modo,',
      'A prática mostra que',
      'Nunca é demais insistir que',
      'A experiência mostra que',
      'É fundamental ressaltar que',
      'O incentivo ao avanço tecnológico, assim como',
      'Assim mesmo,',
    ],
    secondColumn: [
      'a execução deste projeto',
      'a complexidade dos estudos efetuados',
      'a atual estrutura de organização',
      'o novo modelo estrutural aqui preconizado',
      'o desenvolvimento de formas distintas de atuação',
      'a constante divulgação das informações',
      'a consolidação das estruturas',
      'a análise dos diversos resultados',
      'o início do programa de formação de atitudes',
      'a expansão de nossa atividade',
    ],
    thirdColumn: [
      'nos obriga à análise',
      'cumpre um papel essencial na formulação',
      'auxilia a preparação e a estruturação',
      'contribui para a correta determinação',
      'assume importantes posições na definição',
      'facilita a definição',
      'prejudica a percepção da importância',
      'oferece uma boa oportunidade de verificação',
      'acarreta um processo de reformulação',
      'exige precisão e definição',
    ],
    fourthColumn: [
      'das nossas opções de desenvolvimento futuro.',
      'das nossas metas financeiras e administrativas.',
      'das atitudes e das atribuições da diretoria.',
      'das novas proposições.',
      'das opções básicas para o sucesso do programa.',
      'do nosso sistema de formação de quadros.',
      'das condições apropriadas para os negócios.',
      'dos índices pretendidos.',
      'das formas de ação.',
      'dos conceitos de participação geral.',
    ],
  }
  res.json({ sentences });
});

module.exports = router;
