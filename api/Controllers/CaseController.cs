// using Microsoft.AspNetCore.Mvc;
// using TeleHealthAPI.Models;

// namespace TeleHealthAPI.Controllers;

// [Route("api/[controller]")]
// [ApiController]
// public class CaseController : ControllerBase
// {
//     private readonly ApplicationDbContext _context;

//     public CaseController(ApplicationDbContext context)
//     {
//         _context = context;
//     }

//     // GET: api/Case
//     [HttpGet]
//     public ActionResult<IEnumerable<Case>> GetCases()
//     {
//         return Ok(_context.Cases.ToList());
//     }

//     // GET: api/Case/{id}
//     [HttpGet("{id}")]
//     public ActionResult<Case> GetCase(int id)
//     {
//         var caseItem = _context.Cases.Find(id);
//         if (caseItem == null)
//         {
//             return NotFound();
//         }
//         return Ok(caseItem);
//     }

//     // POST: api/Case
//     [HttpPost]
//     public ActionResult<Case> CreateCase(Case caseItem)
//     {
//         _context.Cases.Add(caseItem);
//         _context.SaveChanges();
//         return CreatedAtAction(nameof(GetCase), new { id = caseItem.Id }, caseItem);
//     }

//     // PUT: api/Case/{id}
//     [HttpPut("{id}")]
//     public IActionResult UpdateCase(int id, Case caseItem)
//     {
//         if (id != caseItem.Id)
//         {
//             return BadRequest();
//         }
//         _context.Entry(caseItem).State = EntityState.Modified;
//         _context.SaveChanges();
//         return NoContent();
//     }

//     // DELETE: api/Case/{id}
//     [HttpDelete("{id}")]
//     public IActionResult DeleteCase(int id)
//     {
//         var caseItem = _context.Cases.Find(id);
//         if (caseItem == null)
//         {
//             return NotFound();
//         }
//         _context.Cases.Remove(caseItem);
//         _context.SaveChanges();
//         return NoContent();
//     }
// }
