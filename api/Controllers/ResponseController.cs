using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeleHealthAPI.Models;

namespace TeleHealthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResponseController : ControllerBase
    {
        private readonly IDbContextFactory<ApplicationDbContext> _contextFactory;

        public ResponseController(IDbContextFactory<ApplicationDbContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        // GET: api/Response
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Response>>> GetResponses()
        {
            using var context = _contextFactory.CreateDbContext();
            var responses = await context.Responses
                .Include(r => r.Case)
                .Include(r => r.Doctor)
                .ToListAsync();

            return Ok(responses);
        }

        // GET: api/Response/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Response>> GetResponse(int id)
        {
            using var context = _contextFactory.CreateDbContext();
            var response = await context.Responses
                .Include(r => r.Case)
                .Include(r => r.Doctor)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (response == null)
            {
                return NotFound(new { message = "Response not found." });
            }

            return Ok(response);
        }

        // POST: api/Response/add
        [HttpPost("add")]
        // [Authorize(Roles = "Doctor")]
        public async Task<ActionResult<Response>> CreateResponse([FromBody] ResponseDto responseDto)
        {
            using var context = _contextFactory.CreateDbContext();

            // Validate that the referenced Case exists
            var caseItem = await context.Cases.FindAsync(responseDto.CaseId);
            if (caseItem == null)
            {
                return BadRequest(new { message = "Case not found." });
            }

            // Validate that the referenced Doctor exists
            var doctor = await context.Users.FindAsync(responseDto.DoctorId);
            if (doctor == null)
            {
                return BadRequest(new { message = "Doctor not found." });
            }

            var response = new Response
            {
                CaseId = responseDto.CaseId,
                DoctorId = responseDto.DoctorId,
                Response1 = responseDto.Response1,
                Recommendation = responseDto.Recommendation,
                CreatedAt = DateTime.UtcNow
            };

            context.Responses.Add(response);
            await context.SaveChangesAsync();

            return Ok(response); // Return the created response with 200 OK
        }

        // PUT: api/Response/edit/{id}
        [HttpPut("edit/{id}")]
        // [Authorize(Roles = "Doctor")]
        public async Task<IActionResult> UpdateResponse(int id, [FromBody] ResponseDto responseDto)
        {
            using var context = _contextFactory.CreateDbContext();
            var existingResponse = await context.Responses.FindAsync(id);

            if (existingResponse == null)
            {
                return NotFound(new { message = "Response not found." });
            }

            // Update fields
            existingResponse.Response1 = responseDto.Response1 ?? existingResponse.Response1;
            existingResponse.Recommendation = responseDto.Recommendation ?? existingResponse.Recommendation;

            await context.SaveChangesAsync();

            return Ok(existingResponse); // Return the updated response
        }

        // DELETE: api/Response/delete/{id}
        [HttpDelete("delete/{id}")]
        // [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteResponse(int id)
        {
            using var context = _contextFactory.CreateDbContext();
            var response = await context.Responses.FindAsync(id);

            if (response == null)
            {
                return NotFound(new { message = "Response not found." });
            }

            context.Responses.Remove(response);
            await context.SaveChangesAsync();

            // Return 200 OK with a confirmation message or the deleted response
            return Ok(new { message = "Response deleted successfully.", deletedResponse = response });
        }

    }
}
