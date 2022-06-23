var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSwaggerGen();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.MapGet("/dado/d{numeroFaces}", (int numeroFaces) => {
    if (numeroFaces <= 0)
    {
        return Results.BadRequest(new { mensagem = "O número de faces deve ser positivo não nulo." });
    }

    Random gerador = new Random();

    int numeroSorteado = gerador.Next(1, numeroFaces + 1);

    return Results.Ok(new {
        dado = $"d{numeroFaces}",
        rolagem = numeroSorteado
    });
});

app.Run();
