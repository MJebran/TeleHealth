// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using TeleHealthAPI.Models;
// using System.IO;

// namespace TeleHealthAPI.Controllers
// {
//     [Route("api/[controller]")]
//     [ApiController]
//     public class FileController : ControllerBase
//     {
//         private readonly IDbContextFactory<ApplicationDbContext> _contextFactory;
//         private readonly IWebHostEnvironment _environment;

//         public FileController(IDbContextFactory<ApplicationDbContext> contextFactory, IWebHostEnvironment environment)
//         {
//             _contextFactory = contextFactory;
//             _environment = environment;
//         }

//         // GET: api/File
//         [HttpGet]
//         public async Task<ActionResult<IEnumerable<TeleHealthAPI.Models.File>>> GetFiles()
//         {
//             using var context = _contextFactory.CreateDbContext();
//             return await context.Files.Include(f => f.Case).ToListAsync();
//         }

//         // GET: api/File/{id}
//         [HttpGet("{id}")]
//         public async Task<ActionResult<TeleHealthAPI.Models.File>> GetFile(int id)
//         {
//             using var context = _contextFactory.CreateDbContext();
//             var file = await context.Files.Include(f => f.Case).FirstOrDefaultAsync(f => f.Id == id);
//             if (file == null)
//             {
//                 return NotFound(new { message = "File not found." });
//             }
//             return file;
//         }

//         // POST: api/File/Upload (File Upload)
//         [HttpPost("Upload")]
//         [Authorize(Roles = "Scribe Intern, Doctor")]
//         [Consumes("multipart/form-data")]
//         public async Task<ActionResult<TeleHealthAPI.Models.File>> UploadFile([FromForm] IFormFile file, [FromForm] int caseId)
//         {
//             if (file == null || file.Length == 0)
//             {
//                 return BadRequest(new { message = "No file uploaded." });
//             }

//             using var context = _contextFactory.CreateDbContext();
//             var caseItem = await context.Cases.FindAsync(caseId);
//             if (caseItem == null)
//             {
//                 return NotFound(new { message = "Case not found." });
//             }

//             var uploadsFolderPath = Path.Combine(_environment.WebRootPath, "uploads", "cases", caseId.ToString());
//             Directory.CreateDirectory(uploadsFolderPath);
//             var filePath = Path.Combine(uploadsFolderPath, file.FileName);

//             await using (var stream = new FileStream(filePath, FileMode.Create))
//             {
//                 await file.CopyToAsync(stream);
//             }

//             var fileEntity = new TeleHealthAPI.Models.File
//             {
//                 CaseId = caseId,
//                 FilePath = $"/uploads/cases/{caseId}/{file.FileName}",
//                 FileType = Path.GetExtension(file.FileName),
//                 UploadedAt = DateTime.UtcNow
//             };

//             context.Files.Add(fileEntity);
//             await context.SaveChangesAsync();

//             return Ok(fileEntity); // Return 200 OK with the created file entity
//         }

//         // PUT: api/File/{id}
//         [HttpPut("{id}")]
//         [Authorize(Roles = "Scribe Intern, Doctor")]
//         public async Task<IActionResult> UpdateFile(int id, [FromBody] TeleHealthAPI.Models.File file)
//         {
//             if (id != file.Id)
//             {
//                 return BadRequest(new { message = "File ID mismatch." });
//             }

//             using var context = _contextFactory.CreateDbContext();
//             var existingFile = await context.Files.FindAsync(id);
//             if (existingFile == null)
//             {
//                 return NotFound(new { message = "File not found." });
//             }

//             // Update fields
//             existingFile.FilePath = file.FilePath ?? existingFile.FilePath;
//             existingFile.FileType = file.FileType ?? existingFile.FileType;
//             existingFile.UploadedAt = file.UploadedAt ?? existingFile.UploadedAt;

//             await context.SaveChangesAsync();
//             return Ok(existingFile); // Return 200 OK with the updated file entity
//         }

//         // DELETE: api/File/{id}
//         [HttpDelete("{id}")]
//         [Authorize(Roles = "Admin")]
//         public async Task<IActionResult> DeleteFile(int id)
//         {
//             using var context = _contextFactory.CreateDbContext();
//             var file = await context.Files.FindAsync(id);
//             if (file == null)
//             {
//                 return NotFound(new { message = "File not found." });
//             }

//             // Delete the physical file from the server
//             var filePath = Path.Combine(_environment.WebRootPath, file.FilePath.TrimStart('/'));
//             if (System.IO.File.Exists(filePath))
//             {
//                 System.IO.File.Delete(filePath);
//             }

//             context.Files.Remove(file);
//             await context.SaveChangesAsync();
//             return Ok(new { message = "File deleted successfully.", deletedFile = file });
//         }

//         private bool FileExists(int id)
//         {
//             using var context = _contextFactory.CreateDbContext();
//             return context.Files.Any(e => e.Id == id);
//         }
//     }
// }
