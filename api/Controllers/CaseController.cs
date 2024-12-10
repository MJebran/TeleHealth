using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeleHealthAPI.Models;

namespace TeleHealthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CaseController : ControllerBase
    {
        private readonly IDbContextFactory<ApplicationDbContext> _contextFactory;

        public CaseController(IDbContextFactory<ApplicationDbContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        // GET: api/Case
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Case>>> GetCases()
        {
            using var context = _contextFactory.CreateDbContext();
            return await context.Cases
                .Include(c => c.Patient)
                .Include(c => c.Scribe)
                .Include(c => c.Doctor)
                .Include(c => c.Status)
                .Include(c => c.Files)
                .Include(c => c.Responses)
                .ToListAsync();
        }

        // GET: api/Case/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Case>> GetCase(int id)
        {
            using var context = _contextFactory.CreateDbContext();
            var caseItem = await context.Cases
                .Include(c => c.Patient)
                .Include(c => c.Scribe)
                .Include(c => c.Doctor)
                .Include(c => c.Status)
                .Include(c => c.Files)
                .Include(c => c.Responses)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (caseItem == null)
            {
                return NotFound();
            }

            return caseItem;
        }

        // POST: api/Case
        [HttpPost]
        public async Task<ActionResult<Case>> CreateCase([FromBody] Case caseItem)
        {
            using var context = _contextFactory.CreateDbContext();
            caseItem.CreatedAt = DateTime.UtcNow;
            caseItem.StatusId = 1; // Default to 'Open' status
            context.Cases.Add(caseItem);
            await context.SaveChangesAsync();

            return Ok(caseItem); // Return 200 OK instead of 201 Created
        }

        // PUT: api/Case/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCase(int id, [FromBody] Case caseItem)
        {
            if (id != caseItem.Id)
            {
                return BadRequest("Case ID mismatch.");
            }

            using var context = _contextFactory.CreateDbContext();
            var existingCase = await context.Cases.FindAsync(id);
            if (existingCase == null)
            {
                return NotFound("Case not found.");
            }

            // Update fields
            existingCase.Title = caseItem.Title ?? existingCase.Title;
            existingCase.Description = caseItem.Description ?? existingCase.Description;
            existingCase.Symptoms = caseItem.Symptoms ?? existingCase.Symptoms;
            existingCase.History = caseItem.History ?? existingCase.History;

            await context.SaveChangesAsync();

            return Ok(existingCase);
        }

        // DELETE: api/Case/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCase(int id)
        {
            using var context = _contextFactory.CreateDbContext();
            var caseItem = await context.Cases.FindAsync(id);
            if (caseItem == null)
            {
                return NotFound("Case not found.");
            }

            context.Cases.Remove(caseItem);
            await context.SaveChangesAsync();

            // Return 200 OK with a confirmation message
            return Ok(new { message = "Case deleted successfully", caseId = id });
        }


        // PUT: api/Case/UpdateStatus/{id}
        [HttpPut("UpdateStatus/{id}")]
        public async Task<IActionResult> UpdateCaseStatus(int id, [FromBody] int statusId)
        {
            using var context = _contextFactory.CreateDbContext();
            var caseItem = await context.Cases.FindAsync(id);
            if (caseItem == null)
            {
                return NotFound("Case not found.");
            }

            caseItem.StatusId = statusId;
            await context.SaveChangesAsync();

            return Ok($"Case status updated to {statusId}");
        }

        // PUT: api/Case/DoctorAccept/{id}
        [HttpPut("DoctorAccept/{id}")]
        public async Task<IActionResult> DoctorAcceptCase(int id)
        {
            using var context = _contextFactory.CreateDbContext();
            var caseItem = await context.Cases.FindAsync(id);
            if (caseItem == null)
            {
                return NotFound("Case not found.");
            }

            if (caseItem.StatusId != 3) // Assuming 'Ready for Doctor' has status ID 3
            {
                return BadRequest("Case is not in 'Ready for Doctor' status.");
            }

            caseItem.StatusId = 4; // Set status to 'In Progress'
            await context.SaveChangesAsync();

            return Ok("Case accepted and moved to 'In Progress' status.");
        }

        // PUT: api/Case/Complete/{id}
        [HttpPut("Complete/{id}")]
        public async Task<IActionResult> CompleteCase(int id)
        {
            using var context = _contextFactory.CreateDbContext();
            var caseItem = await context.Cases.FindAsync(id);
            if (caseItem == null)
            {
                return NotFound("Case not found.");
            }

            if (caseItem.StatusId != 4) // Assuming 'In Progress' has status ID 4
            {
                return BadRequest("Case is not in 'In Progress' status.");
            }

            caseItem.StatusId = 5; // Set status to 'Completed'
            await context.SaveChangesAsync();

            return Ok("Case marked as completed.");
        }

        private bool CaseExists(int id)
        {
            using var context = _contextFactory.CreateDbContext();
            return context.Cases.Any(e => e.Id == id);
        }
    }
}
