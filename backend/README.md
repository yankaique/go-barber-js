# Recuperação de senha
**Requisitos Funcionais**
-> O usuário deve poder recuperar sua senha informando seu email
-> O usuário deve receber um e-mail con instrução de recuperação de senha
-> O usuário deve poder resetar sua senha

**Requisitos Não Funcionais**
-> Urilizar mail trap para testar envios em ambiente dev
-> Utilizar Amazon SES para envios em produção
-> O envio de e-mails deve acontecer em segundo plano (background job)

**Regras de Negócio**
-> O link enviado por email para resetar senha, deve expirar em 2h
-> O usuário precisa confirmar a nova senha ao resetar sua senha

# Atualização do perfil
**Requisitos Funcionais**
-> O usuário deve poder atualizar seu perfil

**Regras de Negócio**
-> O usuário não pode alterar seu email para um um e-email já utilizado
-> Para atualizar sua senha, o usuário deve informar sua senha antiga
-> Para atualizar sua senha, o usuário precisa confirmar a nova senha

# Painel do prestador
**Requisitos Funcionais**
-> O usuário deve poder listar seus agendamentos de um dia especifico
-> O prestador deve receber uma notificação sempre que houver um novo agendamento
-> O prestador deve poder visualizar as notificações não lidas

**Requisitos Não Funcionais**
-> Os agendamentos do prestador do dia deve ser armazenados do cache
-> As notificações do prestador devem ser armazenadas no mongoDB
-> As notificações do prestador deve ser enviadas em tempo-real com socket.io

**Regras de Negócio**
-> A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar

# Agendamento de serviços
**Requisitos Funcionais**
-> O usuário deve poder listar todos os pretadores cadastrados
-> O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador
-> O usuário deve poder listar horários disponíveis em um dia especifico de um prestador
-> O usuário deve poder realizar um novo agendamento com um prestador

**Requisitos Não Funcionais**
-> A listagem de prestadores devem ser armazenadas em cache

**Regras de Negócio**
-> Cada agendamento deve durar 1h exatamente
-> Os agendamentos devem estar disponíveis entre ás 8h ás 18h (Primeiro ás 8h, último ás 17h)
-> O usuário não pode agendar em um horário já ocupado
-> O usuário não pode agendarem um horário que já passou
-> O usuário não pode agendar serviços consigo mesmos

