using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TeleHealthAPI.Models;

public partial class Casestatus
{
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string StatusName { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<Case> Cases { get; set; } = new List<Case>();
}
