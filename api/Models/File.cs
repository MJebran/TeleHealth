using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TeleHealthAPI.Models
{
    public partial class File
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey("Case")]
        public int CaseId { get; set; }

        [Required]
        // [MaxLength(255)]
        public string FilePath { get; set; } = null!;

        // [MaxLength(50)]
        public string? FileType { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime? UploadedAt { get; set; }

        [JsonIgnore]
        public virtual Case Case { get; set; } = null!;
    }
}
