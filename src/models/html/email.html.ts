/**
 * A variável que exporta página html do email de confirmação de usuário
 */
export const emailHtml = () => `
<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Confirmar email</title>
    <style>
        .container {
            display: flex;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
        }
        .title {
            font-size: 1.5rem;
            font-weight: bold;
        }
    </style>
</head>

<body>
    <div class="container">
        <a class="title" href="www.google.com">Clique no link para confirmar seu email</a>
    </div>
</body>

</html>
`;
