const formulario = document.getElementById('formulario');
const campoNome = document.getElementById('nome');
const campoNota1 = document.getElementById('nota1');
const campoNota2 = document.getElementById('nota2');
const campoNota3 = document.getElementById('nota3');
const divErros = document.getElementById('erros');
const divResultado = document.getElementById('resultado');
const resNome = document.getElementById('resNome');
const resMedia = document.getElementById('resMedia');
const resSituacao = document.getElementById('resSituacao');
const resTurma = document.getElementById('resTurma');
const btnLimpar = document.getElementById('btnLimpar');

const medias = [];

function validarNota(valor, numero, erros) {
  if (valor.trim() === '') {
    erros.push('Por favor, informe a Nota ' + numero + '.');
  } else if (Number(valor) < 0) {
    erros.push('A Nota ' + numero + ' não pode ser menor que 0.');
  } else if (Number(valor) > 10) {
    erros.push('A Nota ' + numero + ' não pode ser maior que 10.');
  }
}

function calcular(evento) {
  evento.preventDefault();

  const erros = [];
  divErros.style.display = 'none';
  divResultado.style.display = 'none';

  if (campoNome.value.trim() === '') {
    erros.push('Por favor, informe o nome do aluno.');
  }
  validarNota(campoNota1.value, 1, erros);
  validarNota(campoNota2.value, 2, erros);
  validarNota(campoNota3.value, 3, erros);

  if (erros.length > 0) {
    divErros.innerHTML = '';
    for (let i = 0; i < erros.length; i++) {
      divErros.innerHTML += '<p>' + erros[i] + '</p>';
    }
    divErros.style.display = 'block';
    return;
  }

  const nota1 = Number(campoNota1.value);
  const nota2 = Number(campoNota2.value);
  const nota3 = Number(campoNota3.value);
  const media = (nota1 + nota2 + nota3) / 3;

  let situacao;
  let classe;

  if (media >= 7) {
    situacao = 'APROVADO';
    classe = 'aprovado';
  } else if (media >= 5) {
    situacao = 'RECUPERAÇÃO';
    classe = 'recuperacao';
  } else {
    situacao = 'REPROVADO';
    classe = 'reprovado';
  }

  medias.push(media);
  let soma = 0;
  for (let i = 0; i < medias.length; i++) {
    soma += medias[i];
  }
  const mediaTurma = soma / medias.length;

  resNome.textContent = campoNome.value.trim();
  resMedia.textContent = media.toFixed(1);
  resTurma.textContent = mediaTurma.toFixed(1);
  resSituacao.textContent = situacao;
  resSituacao.className = 'situacao ' + classe;
  divResultado.style.display = 'block';
}

function limpar() {
  formulario.reset();
  divErros.style.display = 'none';
  divResultado.style.display = 'none';
}

formulario.addEventListener('submit', calcular);
btnLimpar.addEventListener('click', limpar);
