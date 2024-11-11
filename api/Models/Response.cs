using System;
using System.Collections.Generic;

namespace TeleHealthAPI.Models;

public partial class Response
{
    public int Id { get; set; }

    public int CaseId { get; set; }

    public int DoctorId { get; set; }

    public string Response1 { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public virtual Case Case { get; set; } = null!;

    public virtual User Doctor { get; set; } = null!;
}
