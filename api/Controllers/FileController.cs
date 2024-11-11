// using Microsoft.AspNetCore.Mvc;
// using TeleHealthAPI.Models;

// namespace TeleHealthAPI.Controllers;

// [Route("api/[controller]")]
// [ApiController]
// public class FileController : ControllerBase
// {
//     private readonly ApplicationDbContext _context;

//     public FileController(ApplicationDbContext context)
//     {
//         _context = context;
//     }

//     // GET: api/File
//     [HttpGet]
//     public ActionResult<IEnumerable<File>> GetFiles()
//     {
//         return Ok(_context.Files.ToList());
//     }

//     // GET: api/File/{id}
//     [HttpGet("{id}")]
//     public ActionResult<File> GetFile(int id)
//     {
//         var fileItem = _context.Files.Find(id);
//         if (fileItem == null)
//         {
//             return NotFound();
//         }
//         return Ok(fileItem);
//     }

//     // POST: api/File
//     [HttpPost]
//     public ActionResult<File> UploadFile(File fileItem)
//     {
//         _context.Files.Add(fileItem);
//         _context.SaveChanges();
//         return CreatedAtAction(nameof(GetFile), new { id = fileItem.Id }, fileItem);
//     }

//     // DELETE: api/File/{id}
//     [HttpDelete("{id}")]
//     public IActionResult DeleteFile(int id)
//     {
//         var fileItem = _context.Files.Find(id);
//         if (fileItem == null)
//         {
//             return NotFound();
//         }
//         _context.Files.Remove(fileItem);
//         _context.SaveChanges();
//         return NoContent();
//     }
// }
