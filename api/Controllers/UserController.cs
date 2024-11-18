using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeleHealthAPI.Models;

namespace TeleHealthAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {
    private readonly IDbContextFactory<ApplicationDbContext> _contextFactory;

    public UserController(IDbContextFactory<ApplicationDbContext> contextFactory)
    {
      _contextFactory = contextFactory;
    }

    // GET: api/User
    [HttpGet]
    // [Authorize(Roles = "Admin")] // Only admins can view all users
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
      using var context = _contextFactory.CreateDbContext();
      return await context.Users
          .Include(u => u.Role)
          .Include(u => u.Agreement)
          .ToListAsync();
    }

    // GET: api/User/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(int id)
    {
      using var context = _contextFactory.CreateDbContext();
      var user = await context.Users
          .Include(u => u.Role)
          .Include(u => u.Agreement)
          .FirstOrDefaultAsync(u => u.Id == id);

      if (user == null)
      {
        return NotFound("User not found.");
      }
      return user;
    }

    // POST: api/User (User Registration)
    [HttpPost]
    // [AllowAnonymous]
    public async Task<ActionResult<User>> RegisterUser(User user)
    {
      if (!user.HasAcceptedAgreement ?? false)
      {
        return BadRequest("You must accept the agreement to create an account.");
      }

      using var context = _contextFactory.CreateDbContext();

      // Check if email already exists
      var existingUser = await context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
      if (existingUser != null)
      {
        return BadRequest($"A user with the email '{user.Email}' already exists.");
      }

      user.CreatedAt = DateTime.UtcNow;
      user.Verified = false;
      user.IsApproved = false;

      await context.Users.AddAsync(user);
      await context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
    }


    // PUT: api/User/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, User user)
    {
      if (id != user.Id)
      {
        return BadRequest("User ID mismatch.");
      }

      using var context = _contextFactory.CreateDbContext();
      var existingUser = await context.Users.FindAsync(id);

      if (existingUser == null)
      {
        return NotFound("User not found.");
      }

      // Merge changes into the existing user
      existingUser.Username = user.Username ?? existingUser.Username;
      existingUser.FullName = user.FullName ?? existingUser.FullName;
      existingUser.Email = user.Email ?? existingUser.Email;
      existingUser.RoleId = user.RoleId ?? existingUser.RoleId;
      existingUser.IsApproved = user.IsApproved ?? existingUser.IsApproved;
      existingUser.Gender = user.Gender ?? existingUser.Gender;

      try
      {
        await context.SaveChangesAsync();
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"An error occurred while updating the user: {ex.Message}");
      }

      // Return 200 OK with the updated user
      return Ok(existingUser);
    }


    // DELETE: api/User/{id}
    [HttpDelete("{id}")]
    // [Authorize(Roles = "Admin")] // Only admins can delete users
    public async Task<IActionResult> DeleteUser(int id)
    {
      using var context = _contextFactory.CreateDbContext();
      var user = await context.Users.FindAsync(id);

      if (user == null)
      {
        return NotFound("User not found.");
      }

      context.Users.Remove(user);
      await context.SaveChangesAsync();

      // Return 200 OK with confirmation or deleted user details
      return Ok(new { message = "User successfully deleted", deletedUser = user });
    }


    // POST: api/User/ApproveDoctor/{id}
    [HttpPost("ApproveDoctor/{id}")]
    // [Authorize(Roles = "Admin")] // Only admins can approve doctor applications
    public async Task<IActionResult> ApproveDoctor(int id)
    {
      using var context = _contextFactory.CreateDbContext();
      var user = await context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Id == id);

      if (user == null || user.Role?.RoleName != "Doctor")
      {
        return BadRequest("User not found or is not applying for the Doctor role.");
      }

      user.IsApproved = true;
      await context.SaveChangesAsync();

      return Ok("Doctor application approved successfully.");
    }

    // POST: api/User/ApproveScribe/{id}
    [HttpPost("ApproveScribe/{id}")]
    // [Authorize(Roles = "Admin")] // Only admins can approve scribe intern applications
    public async Task<IActionResult> ApproveScribe(int id)
    {
      using var context = _contextFactory.CreateDbContext();
      var user = await context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Id == id);

      if (user == null || user.Role?.RoleName != "Scribe Intern")
      {
        return BadRequest("User not found or is not applying for the Scribe Intern role.");
      }

      user.IsApproved = true;
      await context.SaveChangesAsync();

      return Ok("Scribe Intern application approved successfully.");
    }

    private async Task<bool> UserExistsAsync(int id)
    {
      using var context = _contextFactory.CreateDbContext();
      return await context.Users.AnyAsync(e => e.Id == id);
    }
  }
}
