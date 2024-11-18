using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeleHealthAPI.Models;

namespace TeleHealthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgreementController : ControllerBase
    {
        private readonly IDbContextFactory<ApplicationDbContext> _contextFactory;

        public AgreementController(IDbContextFactory<ApplicationDbContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        // GET: api/Agreement
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Agreement>>> GetAgreements()
        {
            using var context = _contextFactory.CreateDbContext();
            return await context.Agreements.ToListAsync();
        }

        // GET: api/Agreement/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Agreement>> GetAgreement(int id)
        {
            using var context = _contextFactory.CreateDbContext();
            var agreement = await context.Agreements.FindAsync(id);
            if (agreement == null)
            {
                return NotFound();
            }
            return agreement;
        }

        // POST: api/Agreement/add
        [HttpPost("add")]
        public async Task<IActionResult> AddAgreement([FromBody] Agreement newAgreement)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            using var context = _contextFactory.CreateDbContext();

            try
            {
                newAgreement.CreatedAt = DateTime.UtcNow;
                context.Agreements.Add(newAgreement);
                await context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetAgreement), new { id = newAgreement.Id }, newAgreement);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error saving agreement: {ex.Message}");
            }
        }


        // PUT: api/Agreement/edit/{id}
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> EditAgreement(int id, [FromBody] Agreement updatedAgreement)
        {
            using var context = _contextFactory.CreateDbContext();
            var existingAgreement = await context.Agreements.FindAsync(id);

            if (existingAgreement == null)
            {
                return NotFound("Agreement not found");
            }

            // Merge changes into the existing agreement
            existingAgreement.Version = updatedAgreement.Version ?? existingAgreement.Version;
            existingAgreement.AgreementText = updatedAgreement.AgreementText ?? existingAgreement.AgreementText;

            await context.SaveChangesAsync();

            // Return the updated agreement with 200 OK
            return Ok(existingAgreement);
        }


        // DELETE: api/Agreement/delete/{id}
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteAgreement(int id)
        {
            using var context = _contextFactory.CreateDbContext();
            var agreement = await context.Agreements.FindAsync(id);

            if (agreement == null)
                return NotFound("Agreement not found");

            context.Agreements.Remove(agreement);
            await context.SaveChangesAsync();

            // Return a confirmation message or details about the deleted agreement
            return Ok(new { message = "Agreement successfully deleted", deletedAgreement = agreement });
        }

    }
}
