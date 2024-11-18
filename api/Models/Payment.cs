using System;
using System.Collections.Generic;

namespace TeleHealthAPI.Models;

public partial class Payment
{
    public int Id { get; set; }

    public int PatientId { get; set; }

    public decimal Amount { get; set; }

    public string? PaymentMethod { get; set; }

    public DateTime? PaymentDate { get; set; }

    public virtual User Patient { get; set; } = null!;
}
