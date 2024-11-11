using System;
using System.Collections.Generic;

namespace TeleHealthAPI.Models;

public partial class Case
{
    public int Id { get; set; }

    public int PatientId { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public DateTime? CreatedAt { get; set; }

    public string? Status { get; set; }

    public virtual ICollection<File> Files { get; set; } = new List<File>();

    public virtual User Patient { get; set; } = null!;

    public virtual ICollection<Response> Responses { get; set; } = new List<Response>();
}
