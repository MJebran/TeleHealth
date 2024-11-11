using System;
using System.Collections.Generic;

namespace TeleHealthAPI.Models;

public partial class File
{
    public int Id { get; set; }

    public int CaseId { get; set; }

    public string FilePath { get; set; } = null!;

    public DateTime? UploadedAt { get; set; }

    public virtual Case Case { get; set; } = null!;
}
