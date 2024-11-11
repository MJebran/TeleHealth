using Microsoft.AspNetCore.Mvc;
using TeleHealthAPI.Models;

namespace TeleHealthAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RoleController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public RoleController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Role
    [HttpGet]
    public ActionResult<IEnumerable<Role>> GetRoles()
    {
        return Ok(_context.Roles.ToList());
    }

    // GET: api/Role/{id}
    [HttpGet("{id}")]
    public ActionResult<Role> GetRole(int id)
    {
        var roleItem = _context.Roles.Find(id);
        if (roleItem == null)
        {
            return NotFound();
        }
        return Ok(roleItem);
    }

    // POST: api/Role
    [HttpPost]
    public ActionResult<Role> CreateRole(Role roleItem)
    {
        _context.Roles.Add(roleItem);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetRole), new { id = roleItem.Id }, roleItem);
    }

    // DELETE: api/Role/{id}
    [HttpDelete("{id}")]
    public IActionResult DeleteRole(int id)
    {
        var roleItem = _context.Roles.Find(id);
        if (roleItem == null)
        {
            return NotFound();
        }
        _context.Roles.Remove(roleItem);
        _context.SaveChanges();
        return NoContent();
    }
}
