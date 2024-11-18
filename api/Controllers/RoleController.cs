using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeleHealthAPI.Models;

namespace TeleHealthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IDbContextFactory<ApplicationDbContext> _contextFactory;

        public RoleController(IDbContextFactory<ApplicationDbContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        // GET: api/Role
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> GetRoles()
        {
            using var context = _contextFactory.CreateDbContext();
            return await context.Roles.ToListAsync();
        }

        // GET: api/Role/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Role>> GetRole(int id)
        {
            using var context = _contextFactory.CreateDbContext();
            var role = await context.Roles.FindAsync(id);
            if (role == null)
            {
                return NotFound();
            }
            return role;
        }

        // POST: api/Role
        [HttpPost]
        // [Authorize(Roles = "Admin")] // Only admins can create roles
        public async Task<ActionResult<Role>> CreateRole(Role role)
        {
            using var context = _contextFactory.CreateDbContext();
            context.Roles.Add(role);
            await context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRole), new { id = role.Id }, role);
        }

        // PUT: api/Role/{id}
        [HttpPut("{id}")]
        // [Authorize(Roles = "Admin")] // Only admins can update roles
        public async Task<IActionResult> UpdateRole(int id, [FromBody] Role role)
        {
            if (id != role.Id)
            {
                return BadRequest("ID mismatch");
            }

            using var context = _contextFactory.CreateDbContext();
            var existingRole = await context.Roles.FindAsync(id);

            if (existingRole == null)
            {
                return NotFound("Role not found");
            }

            // Update the role
            existingRole.RoleName = role.RoleName ?? existingRole.RoleName;

            await context.SaveChangesAsync();

            // Return the updated role with 200 OK
            return Ok(existingRole);
        }


        // DELETE: api/Role/{id}
        [HttpDelete("{id}")]
        // [Authorize(Roles = "Admin")] // Only admins can delete roles
        public async Task<IActionResult> DeleteRole(int id)
        {
            using var context = _contextFactory.CreateDbContext();
            var role = await context.Roles.FindAsync(id);
            if (role == null)
            {
                return NotFound("Role not found");
            }

            context.Roles.Remove(role);
            await context.SaveChangesAsync();

            // Return details of the deleted role
            return Ok(new
            {
                Message = "Role successfully deleted",
                DeletedRole = role
            });
        }


        // POST: api/Role/ApproveDoctor/{id}
        [HttpPost("ApproveDoctor/{id}")]
        // [Authorize(Roles = "Admin")] // Only allow Admins to approve doctor applications
        public async Task<IActionResult> ApproveDoctor(int id)
        {
            using var context = _contextFactory.CreateDbContext();
            var user = await context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound("User not found");
            }

            if (user.Role?.RoleName != "Doctor")
            {
                return BadRequest("User is not applying for the Doctor role");
            }

            user.IsApproved = true;
            await context.SaveChangesAsync();
            return Ok("Doctor application approved successfully");
        }

        // POST: api/Role/ApproveScribe/{id}
        [HttpPost("ApproveScribe/{id}")]
        // [Authorize(Roles = "Admin")] // Only allow Admins to approve scribe applications
        public async Task<IActionResult> ApproveScribe(int id)
        {
            using var context = _contextFactory.CreateDbContext();
            var user = await context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound("User not found");
            }

            if (user.Role?.RoleName != "Scribe Intern")
            {
                return BadRequest("User is not applying for the Scribe Intern role");
            }

            user.IsApproved = true;
            await context.SaveChangesAsync();
            return Ok("Scribe Intern application approved successfully");
        }

        private bool RoleExists(int id)
        {
            using var context = _contextFactory.CreateDbContext();
            return context.Roles.Any(e => e.Id == id);
        }
    }
}
