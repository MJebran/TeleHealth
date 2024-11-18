// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using TeleHealthAPI.Models;

// namespace TeleHealthAPI.Controllers
// {
//     [Route("api/[controller]")]
//     [ApiController]
//     public class PaymentController : ControllerBase
//     {
//         private readonly ApplicationDbContext _context;

//         public PaymentController(ApplicationDbContext context)
//         {
//             _context = context;
//         }

//         // GET: api/Payment
//         [HttpGet]
//         [Authorize(Roles = "Admin, Doctor")] // Only Admins and Doctors can view all payments
//         public async Task<ActionResult<IEnumerable<Payment>>> GetPayments()
//         {
//             return await _context.Payments
//                 .Include(p => p.Patient)
//                 .ToListAsync();
//         }

//         // GET: api/Payment/{id}
//         [HttpGet("{id}")]
//         public async Task<ActionResult<Payment>> GetPayment(int id)
//         {
//             var payment = await _context.Payments
//                 .Include(p => p.Patient)
//                 .FirstOrDefaultAsync(p => p.Id == id);

//             if (payment == null)
//             {
//                 return NotFound();
//             }

//             return payment;
//         }

//         // POST: api/Payment
//         [HttpPost]
//         [Authorize(Roles = "Patient")]
//         public async Task<ActionResult<Payment>> CreatePayment(Payment payment)
//         {
//             payment.PaymentDate = DateTime.UtcNow;
//             _context.Payments.Add(payment);
//             await _context.SaveChangesAsync();
//             return CreatedAtAction(nameof(GetPayment), new { id = payment.Id }, payment);
//         }

//         // PUT: api/Payment/{id}
//         [HttpPut("{id}")]
//         [Authorize(Roles = "Admin")] // Only Admins can update payment details
//         public async Task<IActionResult> UpdatePayment(int id, Payment payment)
//         {
//             if (id != payment.Id)
//             {
//                 return BadRequest();
//             }

//             _context.Entry(payment).State = EntityState.Modified;

//             try
//             {
//                 await _context.SaveChangesAsync();
//             }
//             catch (DbUpdateConcurrencyException)
//             {
//                 if (!PaymentExists(id))
//                 {
//                     return NotFound();
//                 }
//                 else
//                 {
//                     throw;
//                 }
//             }

//             return NoContent();
//         }

//         // DELETE: api/Payment/{id}
//         [HttpDelete("{id}")]
//         [Authorize(Roles = "Admin")] // Only Admins can delete payments
//         public async Task<IActionResult> DeletePayment(int id)
//         {
//             var payment = await _context.Payments.FindAsync(id);
//             if (payment == null)
//             {
//                 return NotFound();
//             }

//             _context.Payments.Remove(payment);
//             await _context.SaveChangesAsync();
//             return NoContent();
//         }

//         private bool PaymentExists(int id)
//         {
//             return _context.Payments.Any(e => e.Id == id);
//         }
//     }
// }
