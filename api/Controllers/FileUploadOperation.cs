// using Microsoft.OpenApi.Models;
// using Swashbuckle.AspNetCore.SwaggerGen;

// public class FileUploadOperation : IOperationFilter
// {
//     public void Apply(OpenApiOperation operation, OperationFilterContext context)
//     {
//         var fileUploadParams = context.MethodInfo
//             .GetParameters()
//             .Where(p => p.ParameterType == typeof(IFormFile));

//         if (!fileUploadParams.Any())
//             return;

//         operation.Parameters.Clear();

//         operation.RequestBody = new OpenApiRequestBody
//         {
//             Content =
//             {
//                 ["multipart/form-data"] = new OpenApiMediaType
//                 {
//                     Schema = new OpenApiSchema
//                     {
//                         Type = "object",
//                         Properties =
//                         {
//                             ["file"] = new OpenApiSchema
//                             {
//                                 Type = "string",
//                                 Format = "binary"
//                             }
//                         }
//                     }
//                 }
//             }
//         };
//     }
// }