'use strict';

const AWS = require('aws-sdk')
const {v4: uuidv4} = require('uuid')

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const params = {
  TableName: 'PARAISOPOLIS'
}

module.exports.listarEstabelecimentos = async (event) => {
  try{
    let data = await dynamoDb.scan(params).promise();
    return { 
      statusCode: 200,
      body: JSON.stringify(data.Items)
    };
  } catch (erro) {
    console.log('Error', erro)
    return {
      statusCode: erro.statusCode ? erro.statusCode : 500,
      body: JSON.stringify({
        error: erro.name ? erro.name : "Exception",
        message: erro.message ? erro.message : "Falha na pesquisa"
      })
    }
  };
};


module.exports.buscarEstabelecimentoPorId = async (event) => {
  try{
    const {id_estab} = event.pathParameters;
  
    const data = await dynamoDb.get({...params, Key:{id: id_estab}}).promise();
    
    if (!data.Item) {
      return{ 
        statusCode: 404,
        body: JSON.stringify({error: 'Estabelecimento não cadastrado.'}, null, 2)
      }
    }
    
    const resultado = data.Item
    
    return {
      statusCode: 200,
      body: JSON.stringify(resultado, null, 2),
    };
  
  }catch (erro) {
    console.log('Error', erro)
    return {
      statusCode: erro.statusCode ? erro.statusCode : 500,
      body: JSON.stringify({
        error: erro.name ? erro.name : "Exception",
        message: erro.message ? erro.message : "Falha na pesquisa"
      })
    }
  };
};

module.exports.cadastrarEstabelecimento = async (event) => {
  try{
    let dados = JSON.parse(event.body);

    const { estabelecimento, media_faturamento, raca_entrevistado, cadastrado_por,
      regioes_outras_unidades, imovel_tipo, site_estabelecimento, endereco_estabelecimento,
      redesocial_estabelecimento, proprietario, cnpj, nome_entrevistado, sociedade, 
      categoria_comercio, data_fundacao, outras_unidades, genero_entrevistado, endereco_entrevistado,
      idade_entrevistado, email_entrevistado, numero_funcionarios, origem_proprietario } = dados

    const novo = {
      id: uuidv4(),
      cadastrado_por: cadastrado_por,
      nome_entrevistado: nome_entrevistado,
      idade_entrevistado: idade_entrevistado,
      genero_entrevistado: genero_entrevistado,
      raca_entrevistado: raca_entrevistado,
      email_entrevistado: email_entrevistado,
      endereco_entrevistado: endereco_entrevistado,
      estabelecimento: estabelecimento,
      proprietario: proprietario,
      origem_proprietario: origem_proprietario,
      endereco_estabelecimento: endereco_estabelecimento,
      data_fundacao: data_fundacao,
      sociedade: sociedade,
      categoria_comercio: categoria_comercio,
      cnpj: cnpj,
      media_faturamento: media_faturamento,
      numero_funcionarios: numero_funcionarios,
      site_estabelecimento: site_estabelecimento,
      redesocial_estabelecimento: redesocial_estabelecimento,
      imovel_tipo: imovel_tipo,
      outras_unidades: outras_unidades,
      regioes_outras_unidades: regioes_outras_unidades,
    }

    await dynamoDb.put({
      TableName: "PARAISOPOLIS",
      Item: novo
    }).promise();

    return{
      statusCode: 201,
      body: JSON.stringify({message: "Estabelecimento cadastrado com sucesso!"}),    
    }
  }catch (erro) {
    console.log('Error', erro)
    return {
      statusCode: erro.statusCode ? erro.statusCode : 500,
      body: JSON.stringify({
        error: erro.name ? erro.name : "Exception",
        message: erro.message ? erro.message : "Falha no cadastro"
      })
    }
  };  
},

module.exports.atualizarEstabelecimento = async (event) => {
  const {id_estab} = event.pathParameters;
    
  try{
    let dados = JSON.parse(event.body);

    const { estabelecimento, media_faturamento, raca_entrevistado, cadastrado_por,
      regioes_outras_unidades, imovel_tipo, site_estabelecimento, endereco_estabelecimento,
      redesocial_estabelecimento, proprietario, cnpj, nome_entrevistado, sociedade, 
      categoria_comercio, data_fundacao, outras_unidades, genero_entrevistado, endereco_entrevistado,
      idade_entrevistado, email_entrevistado, numero_funcionarios, origem_proprietario } = dados

    await dynamoDb.update({
      ...params, Key:{id: id_estab},
    UpdateExpression: 'SET cadastrado_por = :cadastrado_por,'
      + 'nome_entrevistado = :nome_entrevistado,'
      + 'idade_entrevistado = :idade_entrevistado,'
      + 'genero_entrevistado = :genero_entrevistado,'
      + 'raca_entrevistado = :raca_entrevistado,'
      + 'email_entrevistado = :email_entrevistado,'
      + 'endereco_entrevistado = :endereco_entrevistado,'
      + 'estabelecimento = :estabelecimento,'
      + 'proprietario = :proprietario,'
      + 'origem_proprietario = :origem_proprietario,'
      + 'endereco_estabelecimento = :endereco_estabelecimento,'
      + 'data_fundacao = :data_fundacao,'
      + 'sociedade = :sociedade,'
      + 'categoria_comercio = :categoria_comercio,'
      + 'cnpj = :cnpj,'
      + 'media_faturamento = :media_faturamento,'
      + 'numero_funcionarios = :numero_funcionarios,'
      + 'site_estabelecimento = :site_estabelecimento,'
      + 'redesocial_estabelecimento = :redesocial_estabelecimento,'
      + 'imovel_tipo = :imovel_tipo,'
      + 'outras_unidades = :outras_unidades,'
      + 'regioes_outras_unidades = :regioes_outras_unidades',
    ConditionExpression: 'attribute_exists(id)',
    ExpressionAttributeValues: {
      ':cadastrado_por': cadastrado_por,
      ':nome_entrevistado': nome_entrevistado,
      ':idade_entrevistado': idade_entrevistado,
      ':genero_entrevistado': genero_entrevistado,
      ':raca_entrevistado': raca_entrevistado,
      ':email_entrevistado': email_entrevistado,
      ':endereco_entrevistado': endereco_entrevistado,
      ':estabelecimento': estabelecimento,
      ':proprietario': proprietario,
      ':origem_proprietario': origem_proprietario,
      ':endereco_estabelecimento': endereco_estabelecimento,
      ':data_fundacao': data_fundacao,
      ':sociedade': sociedade,
      ':categoria_comercio': categoria_comercio,
      ':cnpj': cnpj,
      ':media_faturamento': media_faturamento,
      ':numero_funcionarios': numero_funcionarios,
      ':site_estabelecimento': site_estabelecimento,
      ':redesocial_estabelecimento': redesocial_estabelecimento,
      ':imovel_tipo': imovel_tipo,
      ':outras_unidades': outras_unidades,
      ':regioes_outras_unidades': regioes_outras_unidades
    }
  }).promise();

  return{
    statusCode: 204,
    body: JSON.stringify({message: "Estabelecimento atualizado com sucesso!"})
  };
}catch (erro) {
  console.log('Error', erro)
  return {
    statusCode: erro.statusCode ? erro.statusCode : 500,
    body: JSON.stringify({
      error: erro.name ? erro.name : "Exception",
      message: erro.message ? erro.message : `Falha na atualização. Estabelecimento com id ${id_estab} não existe!` 
    })
  }
};
};

module.exports.excluirEstabelecimento = async (event) => {
  const {id_estab} = event.pathParameters;
  
  try{
    await dynamoDb.delete({...params, Key: {id: id_estab},
      ConditionExpression: 'attribute_exists(id)'
    }).promise();

    return{
      statusCode: 204,
      body: JSON.stringify({message: "Estabelecimento excluído com sucesso!"})
    };  
  }catch (erro) {
    console.log('Error', erro)
    return {
      statusCode: erro.statusCode ? erro.statusCode : 500,
      body: JSON.stringify({
        error: erro.name ? erro.name : "Exception",
        message: erro.message ? erro.message : `Falha na atualização. Estabelecimento com id ${id_estab} não existe!` 
      })
    }
  };
};
