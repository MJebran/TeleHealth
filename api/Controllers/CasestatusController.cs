using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeleHealthAPI.Models;

namespace TeleHealthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CaseStatusController : ControllerBase
    {
        private readonly IDbContextFactory<ApplicationDbContext> _contextFactory;

        public CaseStatusController(IDbContextFactory<ApplicationDbContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        // GET: api/CaseStatus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Casestatus>>> GetCaseStatuses()
        {
            using var context = _contextFactory.CreateDbContext();
            return await context.Casestatuses.ToListAsync();
        }

        // GET: api/CaseStatus/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Casestatus>> GetCaseStatus(int id)
        {
            using var context = _contextFactory.CreateDbContext();
            var caseStatus = await context.Casestatuses.FindAsync(id);

            if (caseStatus == null)
            {
                return NotFound("Case status not found");
            }

            return caseStatus;
        }

        // POST: api/CaseStatus
        [HttpPost]
        public async Task<ActionResult<Casestatus>> CreateCaseStatus([FromBody] Casestatus caseStatus)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            using var context = _contextFactory.CreateDbContext();
            context.Casestatuses.Add(caseStatus);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCaseStatus), new { id = caseStatus.Id }, caseStatus);
        }

        // PUT: api/CaseStatus/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCaseStatus(int id, [FromBody] Casestatus updatedCaseStatus)
        {
            if (id != updatedCaseStatus.Id)
            {
                return BadRequest("ID mismatch");
            }

            using var context = _contextFactory.CreateDbContext();
            var existingCaseStatus = await context.Casestatuses.FindAsync(id);

            if (existingCaseStatus == null)
            {
                return NotFound("Case status not found");
            }

            // Update only the relevant fields
            existingCaseStatus.StatusName = updatedCaseStatus.StatusName ?? existingCaseStatus.StatusName;

            await context.SaveChangesAsync();
            return Ok(existingCaseStatus); // Return updated status
        }

        // DELETE: api/CaseStatus/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCaseStatus(int id)
        {
            using var context = _contextFactory.CreateDbContext();
            var caseStatus = await context.Casestatuses.Include(cs => cs.Cases).FirstOrDefaultAsync(cs => cs.Id == id);

            if (caseStatus == null)
            {
                return NotFound("Case status not found");
            }

            if (caseStatus.Cases.Any())
            {
                return BadRequest("Cannot delete case status with associated cases");
            }

            context.Casestatuses.Remove(caseStatus);
            await context.SaveChangesAsync();

            return Ok($"Case status with ID {id} successfully deleted");
        }

        private bool CaseStatusExists(int id)
        {
            using var context = _contextFactory.CreateDbContext();
            return context.Casestatuses.Any(e => e.Id == id);
        }
    }
}
